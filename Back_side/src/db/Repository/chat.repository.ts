import { PrismaClient } from "@prisma/client";
import { HttpException } from "../../errorHandling/httpException";
import { DbConnection } from "./DbConnection";

class Chat {
  private readonly db;
  constructor() {
    this.db = DbConnection;
  }
  async getChat(sender: number, reciever: number, page: number, size: number) {
    try {
      const conversations = await this.db.conversation.findFirst({
        where: {
          id:
            sender > reciever
              ? `${reciever}_${sender}`
              : `${sender}_${reciever}`,
        },
        select: {
          message: {
            select: {
              sender_id: true,
              text: true,
              sent_at: true,
            },
            take: size,
            skip: size * (page - 1),
            orderBy: {
              sent_at: "desc",
            },
          },
        },
      });
      if (!conversations) {
        await this.db.conversation.create({
          data: {
            id:
              sender > reciever
                ? `${reciever}_${sender}`
                : `${sender}_${reciever}`,
          },
        });

        return { data: [], count: 0 };
      }
      const updateSeen =
        sender < reciever
          ? { first_user_is_seen: true }
          : { second_user_is_seen: true };
      await this.db.conversation.update({
        where: {
          id:
            sender > reciever
              ? `${reciever}_${sender}`
              : `${sender}_${reciever}`,
        },
        data: {
          ...updateSeen,
        },
      });
      const count = await this.db.message.count({
        where: {
          conversation_id:
            sender > reciever
              ? `${reciever}_${sender}`
              : `${sender}_${reciever}`,
        },
      });
      console.log("it will return ");
      return { data: conversations.message, count };
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "db_error");
    }
  }
  async insertMessage(text: string, reciever: number, sender: number) {
    try {
      await this.db.message.create({
        data: {
          text,
          sender_id: +sender,
          conversation: {
            connect: {
              id:
                sender > reciever
                  ? `${reciever}_${sender}`
                  : `${sender}_${reciever}`,
            },
          },
        },
      });
      const updateSeen =
        sender < reciever
          ? { first_user_is_seen: true, second_user_is_seen: false }
          : { second_user_is_seen: true, first_user_is_seen: false };
      await this.db.conversation.update({
        where: {
          id:
            sender > reciever
              ? `${reciever}_${sender}`
              : `${sender}_${reciever}`,
        },
        data: {
          ...updateSeen,
        },
      });
      return "done";
    } catch (e) {
      console.log(e);
    }
  }
  async getConversations(user_id: number, page: number, size: number) {
    try {
      const conversationsQuery = `select convs.count as count , convs.conv_id as conv_id,conversation.first_user_is_seen as first_user_is_seen, conversation.second_user_is_seen as second_user_is_seen from conversation right join(select count(grouped_conv.conv_id) as count,grouped_conv.conv_id as conv_id from (select ordered_message.conversation_id as conv_id from (select * from message where conversation_id like '${user_id}_%' or conversation_id like '%_${user_id}' order by sent_at) as ordered_message group by ordered_message.conversation_id) as grouped_conv group by grouped_conv.conv_id) convs on convs.conv_id = conversation.id   offset ${
        (page - 1) * size
      } limit ${size}`;
      const conv_id: {
        conv_id: string;
        count: number;
        first_user_is_seen: boolean;
        second_user_is_seen: boolean;
      }[] = await this.db.$queryRawUnsafe<
        {
          conv_id: string;
          count: number;
          first_user_is_seen: boolean;
          second_user_is_seen: boolean;
        }[]
      >(conversationsQuery);
      const with_user: { id: number }[] = [];
      const count = conv_id.length == 0 ? 0 : +conv_id[0].count;
      const userSeenStatus: { id: number; isSeen: boolean }[] = [];
      conv_id.forEach((elem) => {
        const usersIds = elem.conv_id.split("_");
        if (+usersIds[0] == user_id) {
          userSeenStatus.push({
            isSeen: elem.first_user_is_seen,
            id: +usersIds[1],
          });
          with_user.push({ id: +usersIds[1] });
        } else {
          userSeenStatus.push({
            isSeen: elem.second_user_is_seen,
            id: +usersIds[0],
          });
          with_user.push({ id: +usersIds[0] });
        }
      });
      const users =
        count == 0
          ? []
          : await this.db.users.findMany({
              where: {
                OR: with_user,
              },
              select: {
                id: true,
                first_name: true,
                last_name: true,
                photo: true,
                room_id: true,
              },
            });
      const finalUserInfo = users.map((userInfo) => {
        let newUserInfo;
        for (let isUserSeen of userSeenStatus) {
          if (isUserSeen.id == userInfo.id) {
            newUserInfo = { ...userInfo, isSeen: isUserSeen.isSeen };
            break;
          }
        }
        return newUserInfo;
      });
      return { data: finalUserInfo, count };
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "db_error");
    }
  }
}
export const ChatRepository = new Chat();
