import sendRequest from "./fetchRequest";

export type messege = {
  chat_id: number;
  message: string;
  sender_id: string;
  read: boolean;
  timestamp: string;
};

type getMessege = {
  messege: string;
};

export async function getAllMessages(chat_id: string, user_id: string) {
  const userId = parseInt(user_id);
  const chatId = parseInt(chat_id);
  return (await sendRequest<messege>({
    url: `/${userId}/messege/${chatId}`,
    method: "GET"
  })) as messege[];
}

export async function sendMessege(message: messege) {
  const chatId = message.chat_id;
  
  return await sendRequest<messege>({
    url: `/message/${chatId}`,
    method: "POST",
    body: message
  });
}
