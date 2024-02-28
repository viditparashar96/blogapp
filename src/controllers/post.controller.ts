import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

export const createPost = async (req: any, res: Response) => {
  try {
    const { title, content } = req.body;
    const createdPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: req.user?.id,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      data: createdPost,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (req: any, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        author: true,
      },
    });
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        comments: true,
        author: true,
      },
    });

    res.status(200).json({
      messsage: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostByUser = async (req: any, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.user?.id,
      },
      include: {
        comments: true,
      },
    });
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    const savedPost = await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: {
        savedPosts: {
          connect: {
            id: parseInt(id),
          },
        },
      },
    });

    res.status(200).json({
      message: "Post saved successfully",
      data: savedPost,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPostsbyUser = async (req: any, res: Response) => {
  try {
    const savedPosts = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        savedPosts: true,
      },
    });
    res.status(200).json({
      message: "Saved posts fetched successfully",
      data: savedPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavedPost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const savedPost: any = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        savedPosts: {
          where: {
            id: parseInt(id),
          },
        },
      },
    });
    if (savedPost.savedPosts.length === 0) {
      return res.status(400).json({
        message: "Post not found in saved posts",
      });
    }
    const deletedSavedPost = await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: {
        savedPosts: {
          disconnect: {
            id: parseInt(id),
          },
        },
      },
    });
    res.status(200).json({
      message: "Post deleted from saved posts successfully",
      data: deletedSavedPost,
    });
  } catch (error) {
    console.log(error);
  }
};
