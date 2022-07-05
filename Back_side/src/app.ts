import express, { Request, Response } from "express";
import { loginRoute } from "./controller/login.router";
import cors from "cors";
import { ErrorHandlingMiddleware } from "./errorHandling/httpException";
import { roleRoute, userRoute } from "./controller/user_role.router";
import { deleteResponseHeadersSetForApp } from "./middleware/deleteResponeHeaers";
import { Server } from "socket.io";
import http from "http";
import { socketConnection } from "./controller/socket";
import { chatRoute } from "./controller/chat.router";
import { projectRoute } from "./controller/project.route";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socketConnection);
//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  const hello = (false && 2) || 3;
  res.send("ok");
});
app.use(loginRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/chat", chatRoute);
app.use("/project", projectRoute);
app.use(deleteResponseHeadersSetForApp);
app.use(ErrorHandlingMiddleware);

server.listen(3001, () => {
  console.log("server running");
});
