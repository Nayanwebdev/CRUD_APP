import { Router } from "express";
import multer from "multer";
import { addUser, getAllUser, getSingleUser, deleteUser, updateUser } from "../controller/homeController.js";
import avtarStorage from "../middleware/avatarstorage.js";

const router = Router();

router.get("/", async (req, res) => {
  res.send(`<h1 style="color:red; text-align:center;">welcome to CRUD APP</h1>`);
});

router.post("/user", multer({ storage: avtarStorage }).single("avatar"), addUser);
router.get("/user", getAllUser);
router.get("/user/:id", getSingleUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", multer({ storage: avtarStorage }).single("avatar"), updateUser);

export default router;
