import { NextFunction, Request, Response, Router } from "express";
import { authenticateUser } from "../middleware/authentication";
import { ChatService } from "../service/chat.service";

export const chatRoute = Router();
const chatService = ChatService;
chatRoute.get(
  "/getConversations/:page/:size",
  [authenticateUser()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await chatService.getConversations(
        res.locals.user.id,
        +req.params["page"],
        +req.params["size"]
      );
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
chatRoute.get(
  "/getChat/:page/:size/:reciever",
  [authenticateUser()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await chatService.getChat(
        res.locals.user.id,
        +req.params["reciever"],
        +req.params["page"],
        +req.params["size"]
      );
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
