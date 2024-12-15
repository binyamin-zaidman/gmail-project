import sendRequest from "./fetchRequest";

type messege  = {
    text: string,
    chat_id: number,
    // user_id: number,
    read: boolean,
    sender_id: number
}

type getMessege =  {
    messege: string
}

export async function getAllMesseges(chat_id: number) {
    return await sendRequest<messege>({
        url: `/messege/${chat_id}`,
        method : "GET"
    })
}


export async function sendMessege(message: messege) {
    
    const chatId = message.chat_id
    return await sendRequest<messege>({
        url: `/message/${chatId}`,
        method: "POST",
        body: message
    })
}
