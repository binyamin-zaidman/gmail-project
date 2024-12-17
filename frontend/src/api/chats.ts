import sendRequest from "./fetchRequest";

type getChats = {
    user_id: number
}
type createChat = {
    user_id: number,
    title: string,
    description: string
}

export async function getAllChats(user_id: getChats) {
    return await sendRequest<getChats>({
        "url": `/chats/${user_id}`,
        method: "GET",

    })
}

export async function createChat(props: createChat) {
    return await sendRequest<createChat>({
        "url": `/chats/${props.user_id}`,
        method: "POST",
        body: props
    })

}