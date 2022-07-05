import { number } from "joi";
import { ChatRepository } from "../db/Repository/chat.repository";
import { MinioClient } from "./image.service";

class Chat {
  private readonly chatRepository;
  private readonly imageService;
  constructor() {
    this.chatRepository = ChatRepository;
    this.imageService = MinioClient;
  }
  async insertMessage(text: string, reciever: number, sender: number) {
    return await this.chatRepository.insertMessage(text, reciever, sender);
  }
  async getChat(sender: number, reciever: number, page: number, size: number) {
    return await this.chatRepository.getChat(sender, reciever, page, size);
  }
  async getConversations(user_id: number, page: number, size: number) {
    const res = await this.chatRepository.getConversations(user_id, page, size);
    for (let elem of res.data) {
      if (elem?.photo) {
        elem.photo = await this.imageService.generateLink(elem.photo);
      }
    }
    return res;
  }
}
export const ChatService = new Chat();
