import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const revisedToken = token?.replace("Bearer ", "");
    console.log(revisedToken);
    if (!revisedToken) {
      return res.status(401).json("Access Denied");
    }
    const decoded = jwt.verify(revisedToken, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };
    console.log(decoded);
    const foundedUser = await prisma.user.findUnique({
      where: {
        id: parseInt(decoded.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!foundedUser) {
      return res.status(404).json("User not found");
    }
    req.user = foundedUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json("token is not valid");
  }
};
