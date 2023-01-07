const { Router } = require("express");
const {
  getAllGroup,
  getMyGroup,
  getGroupById,
  getAllGroupPublic,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addMemberToGroupById,
  removeMemberFromGroupById,
} = require("../controller/group.controller");
const router = Router();

// setup router

// router get all document and get from controller
router.get("/", getAllGroup);

// get all my group and group i joined
router.get("/me/group", getMyGroup);

// get group by id and check if user is member of group and i created
router.get("/:id", getGroupById);

// get all group public
router.get("/group/public", getAllGroupPublic);

// create group
router.post("/", createGroup);

// edit group by id if i am creator of group
router.patch("/:id", updateGroupById);

// add member to group if i am creator of group
router.patch("/:id/add", addMemberToGroupById);

// remove member from group if i am creator of group
router.patch("/:id/remove", removeMemberFromGroupById);

// delete group by id if i am creator of group
router.delete("/:id", deleteGroupById);

module.exports = router;
