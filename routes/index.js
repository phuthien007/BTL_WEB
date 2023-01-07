// setup router
const express = require("express");
const { checkLogin } = require("../middlewares/index.js");
const router = express.Router();

// api comiple code
// setup prefix api
// router.use("/compile", checkLogin, require("./compile.router.js"));
router.use("/user", require("./user.router.js"));
router.use("/blog", checkLogin, require("./blog.router.js"));
router.use("/comment", checkLogin, require("./comment.router.js"));
router.use("/answer", checkLogin, require("./answer.router.js"));
router.use("/tag", checkLogin, require("./tag.router.js"));
router.use("/question", checkLogin, require("./question.router.js"));
// router.use("/request", require("./request.router.js"));
router.use("/group", checkLogin, require("./group.router.js"));
module.exports = router;
