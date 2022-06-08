import express, { Request, Response } from "express";
import { loginRoute } from "./controller/login.router";
import cors from "cors";
import { ErrorHandlingMiddleware } from "./errorHandling/httpException";
import { roleRoute, userRoute } from "./controller/user_role.router";
import { deleteResponseHeadersSetForApp } from "./middleware/deleteResponeHeaers";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  const hello = (false && 2) || 3;
  res.send("ok");
});
app.use(loginRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use(deleteResponseHeadersSetForApp);
app.use(ErrorHandlingMiddleware);

app.listen(3001, () => {
  console.log("server running");
});
