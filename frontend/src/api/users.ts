import sendRequest from "./fetchRequest";

type UserExist = {
    phone: string
    password: string
    token: string
}

type formData = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    question: string,
    answer: string
}
export type userExist = {user_id:string, token:string}
export type sendRequestTypes = formDataWithToken | userExist
export type formDataWithToken = formData & {token:string, id:number}
export async function getUserExist(phone: string, password: string){
    return await sendRequest<UserExist>({
        "url": '/users/login',
        "method": "POST",
        body: { phone, password },
    }) as userExist;
}

export async function createUser({ firstName, lastName, email, phone, password, question, answer }: formData):Promise<formDataWithToken> {
    return await sendRequest<formData>({
        "url": `/users/register`,
        method: "POST",
        body: { firstName, lastName, email, phone, password, question, answer },
    }) as formDataWithToken

}
