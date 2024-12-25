import sendRequest from "./fetchRequest";
type createChat = {
    userId: string,
    userToChat: string|number,
}

export async function getAllChats(userId: string) {
    
    return await sendRequest<string>({
        url: `/chats/${userId}`,
        method: "GET",

    })
}

export async function createChat(props: createChat) {
  
    
    return await sendRequest<createChat>({
        url: `/chats/${props.userId}`,
        method: "POST",
        body: props
    })
}

export async function RemoveChat(chatId: string) {
    return await sendRequest<string>({
        url: `/chats/${chatId}`,
        method: "DELETE"
    })

}