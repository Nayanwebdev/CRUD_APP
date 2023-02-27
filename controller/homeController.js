import { fstat } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import fs from "fs";
const __dirname = path.join(dirname(fileURLToPath(import.meta.url)));

import db from "../config/dbConfig.js";

const User = db.users;

export const addUser = async (req, res) => {
  try {
    const isRegisteredUser = await User.findOne({ where: { email: req.body.email } });
    if (isRegisteredUser) {
      fs.unlinkSync(path.join(__dirname, "../uploads/avatar", req.file.filename));
      // return res.status(403).json("user already registered");
      return res.redirect("back");
    }
    const AVATAR_PATH = path.join("/uploads/avatar");
    const user = await User.create({
      name: req.body.name,
      avatar: AVATAR_PATH + "/" + req.file.filename,
      email: req.body.email,
      position: req.body.position,
      phone: req.body.phone,
      password: req.body.password,
    });
    // res.status(200).json(user);
    res.redirect("/getuser");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.findAll({});
    // res.status(200).json(allUser);
    res.render("viewAllUser", { user: allUser });
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    const tempUser = [];
    tempUser.push(user);
    // res.status(200).json(tempUser);
    console.log(tempUser);
    res.render("viewUser", { user: tempUser });
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    const avatar = user.avatar;
    if (fs.existsSync(path.join(__dirname, "..", avatar))) {
      fs.unlinkSync(path.join(__dirname, "..", avatar));
    }
    const deleteUser = await User.destroy({ where: { id: req.params.id } });
    // return res.status(200).json("user deleted successfully");
    return res.redirect("back");
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.file) {
      const user = await User.findOne({ where: { id: req.params.id } });
      //   console.log(user);
      fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      const { name, email, password } = req.body;
      const AVATAR_PATH = path.join("./uploads/avatar");
      const isUpdatUser = await user.update(
        {
          name,
          avatar: AVATAR_PATH + "/" + req.file.filename,
          email,
          password,
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).send("user updated successfully");
    } else {
      const newObj = req.body;
      console.log(newObj);
      const updateUser = await User.update(newObj, { where: { id: req.params.id } });
      return res.status(200).send("user updated successfully");
    }
  } catch (err) {
    res.status(500).json("something went wrong when updating user");
  }
};

export const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    const existUser = await User.findOne({ where: { email: req.body.email } });
    // console.log(existUser);
    if (!existUser || existUser.password != password) {
      return res.status(404).json("abe tu muje database me dikh nahi raha yato tera password galat he.....");
    }
    let token;
    token = jwt.sign({ id: existUser.id, email: existUser.email, password: existUser.password }, process.env.SECRET_KEY, { expiresIn: "1h" });

    return res.cookie("access_token", token).status(200).json({ message: "Logged in successfully 😊 👌", token });

    // res.status(200).json(token);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const accessToken = (req, res, next) => {
  console.log(req.cookies.access_token);
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(404).json("token to de bhai");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodedToken);
    res.status(200).json({ data: decodedToken });
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};
