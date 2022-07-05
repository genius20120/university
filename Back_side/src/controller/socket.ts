import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatService } from "../service/chat.service";

const chatService = ChatService;
export function socketConnection(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("join_room", (data) => {
    socket.join(data.room_id);
    console.log("joined");
    return;
  });
  socket.on(
    "send_message",
    async (data: {
      message: string;
      room_id: string;
      sender_id: number;
      reciever_id: number;
    }) => {
      const { room_id, ...recieveData } = data;

      await chatService.insertMessage(
        data.message,
        data.reciever_id,
        data.sender_id
      );
      await socket.to(room_id).emit("recieve_message", recieveData);
      return;
    }
  );
}
