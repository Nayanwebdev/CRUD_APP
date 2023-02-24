import { Router } from "express";
import multer from "multer";
import { addUser, getAllUser, getSingleUser, deleteUser, updateUser, userLogin,accessToken } from "../controller/homeController.js";
import avtarStorage from "../middleware/avatarstorage.js";

const router = Router();

router.get("/", async (req, res) => {res.render("addUser")});
// router.get("/ViewUser", async (req, res) => {res.render("viewUser")});

router.post("/user", multer({ storage: avtarStorage }).single("avatar"), addUser);
router.get("/getuser", getAllUser);
router.get("/getuser/:id", getSingleUser);
router.delete("/delete/:id", deleteUser);
router.get("/delete/:id", deleteUser);
router.patch("/user/:id", multer({ storage: avtarStorage }).single("avatar"), updateUser);
router.post("/userlogin", userLogin);
router.get("/accessToken", accessToken);

export default router;
