import sendRequest from "./fetchRequest";

type getChats={
    user_id:number
}

export async function getAllChats(user_id: number) {
    return await sendRequest<getChats>({
    "url": '/chats',
    method: "GET",
    body: {user_id}
})
}