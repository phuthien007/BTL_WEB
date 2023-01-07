const UserModel = require("../models/user.server.model");
const GroupModel = require("../models/group.server.model");

const AppError = require('../utils/app.error');

// function create group
exports.createGroup = async (req, res, next) => {
  const group = new GroupModel(req.body);
  try {
    const newGroup = await group.save();

    res.status(201).json({
			status: 'success',
			data: {
				group: newGroup
			}
		})
  } catch (err) {
    return next(err);
  }
};

// function get all group
exports.getAllGroup = async (req, res, next) => {
  try {
    const groups = await GroupModel.find();

    res.status(200).json({
			status: 'success',
			result: groups.length,
			data: {
				groups
			}
		})
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
			status: 'success',
			data: {
				groups
			}
		})
  } catch (err) {
    return next(err);
  }
};

// function get all group public
exports.getAllGroupPublic = async (req, res, next) => {
  try {
    const groups = await GroupModel.find({ isPublic: true });

    res.status(200).json({
			status: 'success',
			result: groups.length,
			data: {
				groups
			}
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
      return next(new AppError('Group not found', 404));
    }

		// TODO: should put error case first
    if (group.creator == req.user._id || group.members.includes(req.user._id)) {
      return res.status(200).json({
				status: 'success',
				data: {
					group
				}
			});
    }
    return next(new AppError('You are not member of this group', 401));
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
      return next(new AppError('You are not creator of this group', 401));
    }

    const updatedGroup = await res.group.save();
		
    return res.status(200).json({
			status: 'success',
			data: {
				group: updatedGroup
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function delete group by id, check if user is creator of group
exports.deleteGroupById = async (req, res, next) => {
  try {
    if (res.group.creator != req.user._id) {
      return next(new AppError('You are not creator of this group', 401));
    }

    await res.group.remove();

    return res.status(200).json({
			status: 'success',
			data: null
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
      return next(new AppError('User not found', 404));
    }
    if (res.group.creator != req.user._id) {
      return next(new AppError('You are not creator of this group', 401));
    }

    res.group.members.push(user);

    const updatedGroup = await res.group.save();

    return res.status(200).json({
			status: 'success',
			data: {
				group: updatedGroup
			}
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
      return next(new AppError('User not found', 404));
    }

    res.group.members.pull(user);

    const updatedGroup = await res.group.save();

    return res.status(200).json({
			status: 'success',
			data: {
				group: updatedGroup
			}
		});
  } catch (err) {
    return next(err);
  }
};
