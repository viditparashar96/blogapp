import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/api/v1/user", require("./routes/user.route"));
app.use("/api/v1/post", require("./routes/post.route"));
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serversss");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
