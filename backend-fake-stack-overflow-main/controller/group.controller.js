const UserModel = require("../models/user.server.model");
const GroupModel = require("../models/group.server.model");
const RequestModel = require("../models/request.server.model");
const AppError = require("../utils/app.error");

// function create group
exports.createGroup = async (req, res, next) => {
  req.body.creator = req.user;
  const group = new GroupModel(req.body);
  try {
    const newGroup = await group.save();

    res.status(201).json({
      status: "success",
      data: {
        group: newGroup,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get all group
exports.getAllGroup = async (req, res, next) => {
  try {
    let objSort;
    if (req.query.sort) {
      const sortBy =
        req.query.sort instanceof Array ? req.query.sort : [req.query.sort];
      delete req.query.sort;
      // convert to object
      objSort = sortBy.reduce((acc, cur) => {
        const [key, value] = cur.split(",");
        acc[key] = value;
        return acc;
      }, {});
      console.log(objSort);
    }
    const groups = await GroupModel.find(req.query)
      .sort({ ...objSort })
      .populate([
        {
          path: "creator",
          model: UserModel,
        },
      ]);

    res.status(200).json({
      status: "success",
      result: groups.length,
      data: {
        groups,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// TODO: groups not group
// function get all my group and group i joined
exports.getMyGroup = async (req, res, next) => {
  try {
    const groups = await GroupModel.find({
      $or: [{ creator: req.user._id }, { members: req.user._id }],
    });

    res.status(200).json({
      status: "success",
      data: {
        groups,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get other group
exports.getOtherGroup = async (req, res, next) => {
  try {
    const groups = await GroupModel.find({
      $and: [
        { creator: { $ne: req.user._id } },
        { members: { $ne: req.user._id } },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        groups,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get request join group
exports.getRequestJoinMyGroup = async (req, res, next) => {
  try {
    const groups = await GroupModel.find({
      $and: [{ creator: req.user._id }],
    });

    const requests = await RequestModel.find({
      $and: [
        {
          group: {
            $in: groups.map((group) => group._id),
          },
        },
      ],
    }).populate([
      {
        path: "group",
        model: GroupModel,
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        requests,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get my request join group
exports.getMyRequestJoinGroup = async (req, res, next) => {
  try {
    const requests = await RequestModel.find({
      $and: [{ creator: req.user._id }],
    }).populate([
      {
        path: "group",
        model: GroupModel,
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        requests,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function join group if group is public and user is not member of group
exports.joinGroup = async (req, res, next) => {
  try {
    const group = await GroupModel.findById(req.params.id);
    // check not my group
    if (String(group.creator) == String(req.user._id)) {
      return next(new AppError("This is your group", 400));
    }
    if (group.is_public) {
      if (!group.members.includes(req.user._id)) {
        group.members.push(req.user._id);
        await group.save();
        return res.status(200).json({
          status: "success",
          data: {
            group,
          },
        });
      } else {
        // remove user from group
        group.members = group.members.filter(
          (member) => String(member) != String(req.user._id)
        );
        await group.save();
        return res.status(200).json({
          status: "success",
          data: {
            group,
          },
        });
      }
    }
    if (!group.members.includes(req.user._id)) {
      const request = new RequestModel({
        creator: req.user._id,
        group: group._id,
      });
      await request.save();
      return res.status(200).json({
        status: "success",
        data: {
          request,
        },
      });
    } else {
      // remove user from group
      group.members = group.members.filter(
        (member) => String(member) != String(req.user._id)
      );
      await group.save();
      return res.status(200).json({
        status: "success",
        data: {
          group,
        },
      });
    }
  } catch (err) {
    return next(err);
  }
};

// function get all group public
exports.getAllGroupPublic = async (req, res, next) => {
  try {
    const groups = await GroupModel.find({ isPublic: true });

    res.status(200).json({
      status: "success",
      result: groups.length,
      data: {
        groups,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// acceptToJoinGroup
exports.acceptToJoinGroup = async (req, res, next) => {
  try {
    const request = await RequestModel.findById(req.params.requestId);
    if (!request) {
      return next(new AppError("Request not found", 404));
    }
    const group = await GroupModel.findById(request.group);
    if (String(group.creator) == String(req.user._id)) {
      return next(new AppError("This is your request", 400));
    }

    request.status = "accepted";
    await request.save();
    group.members.push(request.creator);
    await group.save();
    return res.status(200).json({
      status: "success",
      data: {
        request,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// rejectToJoinGroup
exports.rejectToJoinGroup = async (req, res, next) => {
  try {
    const request = await RequestModel.findById(req.params.requestId);
    if (!request) {
      return next(new AppError("Request not found", 404));
    }
    const group = await GroupModel.findById(request.group);
    if (String(group.creator) == String(req.user._id)) {
      return next(new AppError("This is your request", 400));
    }

    request.status = "rejected";
    await request.save();
    group.members.push(request.creator);
    await group.save();
    return res.status(200).json({
      status: "success",
      data: {
        request,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get group by id, check if user is member of group and i created
exports.getGroupById = async (req, res, next) => {
  try {
    const group = await GroupModel.findById(req.params.id);
    if (!group) {
      return next(new AppError("Group not found", 404));
    }

    // TODO: should put error case first
    if (group.creator == req.user._id || group.members.includes(req.user._id)) {
      return res.status(200).json({
        status: "success",
        data: {
          group,
        },
      });
    }
    return next(new AppError("You are not member of this group", 401));
  } catch (err) {
    return next(err);
  }
};

// function update group by id, check if user is creator of group
exports.updateGroupById = async (req, res, next) => {
  if (req.body.name != null) {
    res.group.name = req.body.name;
  }
  if (req.body.description != null) {
    res.group.description = req.body.description;
  }
  if (req.body.is_public != null) {
    res.group.is_public = req.body.is_public;
  }
  if (req.body.members != null) {
    res.group.members = req.body.members;
  }

  try {
    if (res.group.creator != req.user._id) {
      return next(new AppError("You are not creator of this group", 401));
    }

    const updatedGroup = await res.group.save();

    return res.status(200).json({
      status: "success",
      data: {
        group: updatedGroup,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function delete group by id, check if user is creator of group
exports.deleteGroupById = async (req, res, next) => {
  try {
    if (res.group.creator != req.user._id) {
      return next(new AppError("You are not creator of this group", 401));
    }

    await res.group.remove();

    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

// function add member to group by id, check if user is creator of group
exports.addMemberToGroupById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.user_id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (res.group.creator != req.user._id) {
      return next(new AppError("You are not creator of this group", 401));
    }

    res.group.members.push(user);

    const updatedGroup = await res.group.save();

    return res.status(200).json({
      status: "success",
      data: {
        group: updatedGroup,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function remove member from group by id, check if user is creator of group
exports.removeMemberFromGroupById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.user_id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.group.members.pull(user);

    const updatedGroup = await res.group.save();

    return res.status(200).json({
      status: "success",
      data: {
        group: updatedGroup,
      },
    });
  } catch (err) {
    return next(err);
  }
};
