import sendRequest from "./fetchRequest";

type messege  = {
    chat_id: number,
    text: string,
    read: boolean,
    sender_id: number
    // user_id: number,
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
