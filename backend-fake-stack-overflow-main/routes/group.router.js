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
  getOtherGroup,
  getMyRequestJoinGroup,
  getRequestJoinMyGroup,
  joinGroup,
  acceptToJoinGroup,
  rejectToJoinGroup,
} = require("../controller/group.controller");
const { checkLogin } = require("../middlewares");
const router = Router();

// setup router

// router get all document and get from controller
router.get("/", getAllGroup);

// get all my group and group i joined
router.get("/me/group", checkLogin, getMyGroup);
router.get("/others", checkLogin, getOtherGroup);

// get my request join group
router.get("/me/request", getMyRequestJoinGroup);

// get request join my group
router.get("/me/group/request", getRequestJoinMyGroup);

// join public group
router.get("/:id/join", joinGroup);

// accept request join group
router.get("/:requestId/request/accept", acceptToJoinGroup);

// reject request join group
router.get("/:requestId/request/reject", rejectToJoinGroup);

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
