import sendRequest from "./fetchRequest";

export type messege = {
  chat_id: number;
  message: string;
  userName: string;
  sender: boolean;
  timestamp: string;
};

type getMessege = {
  messege: string;
};

export async function getAllMessages(chat_id: string, user_id: string) {
  console.log(chat_id);
  console.log(user_id);

  return (await sendRequest<messege>({
    url: `/${user_id}/messege/${chat_id}`,
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
