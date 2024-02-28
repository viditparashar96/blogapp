import express from "express";
import {
  createPost,
  deletePost,
  deleteSavedPost,
  getPost,
  getPostByUser,
  getPosts,
  getSavedPostsbyUser,
  savePost,
  updatePost,
} from "../controllers/post.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/createPost").post(authenticateUser, createPost);
router.route("/getPosts").get(authenticateUser, getPosts);
router.route("/getPost/:id").get(authenticateUser, getPost);
router.route("/getPostByUser").get(authenticateUser, getPostByUser);
router.route("/updatePost/:id").patch(authenticateUser, updatePost);
router.route("/deletePost/:id").delete(authenticateUser, deletePost);
router.route("/savePost/:id").post(authenticateUser, savePost);
router.route("/getsavePost/:id").get(authenticateUser, getSavedPostsbyUser);
router.route("/deletesavedPost/:id").delete(authenticateUser, deleteSavedPost);
module.exports = router;
