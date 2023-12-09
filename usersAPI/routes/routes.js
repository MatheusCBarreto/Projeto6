var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post("/user", UserController.create);
router.get("/user", AdminAuth, UserController.index);
router.get("/user/:id", AdminAuth, UserController.searchUserById);
router.put("/user", AdminAuth, UserController.updateUser);
router.delete("/user/:id", AdminAuth, UserController.userDelete);
router.post("/login", UserController.login);
router.post("/validate", AdminAuth, HomeController.validate);



module.exports = router;