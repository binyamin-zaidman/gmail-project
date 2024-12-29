import sendRequest from "./fetchRequest";

export type messege = {
  chat_id: string;
  chat_name?: string;
  message?: string;
  sender_id: string;
  sender_name: string;
  is_read: boolean;
  message_time: string;
  message_id?: string;
};

type getMessege = {
  messege: string;
};

export async function getAllMessages(chat_id: string, user_id: string) {
  const userId = user_id;
  const chatId = chat_id;
  return await sendRequest<messege>({
    url: `/${userId}/messege/${chatId}`,
    method: "GET"
  }) as messege[];
}

export async function sendMessege(message: messege) {
  const chatId = message.chat_id;
  
  return await sendRequest<messege>({
    url: `/message/${chatId}`,
    method: "POST",
    body: message
  });
}
