import sendRequest from "./fetchRequest";

type UserExist = {
    phone: string
    password: string
    token: string
}

type createUser = {
    first_name: string,
    last_name: string,
    Email: string,
    phone: number,
    password: string,
    question: string,
    answer: string
}

export async function getUserExist(phone: string, password: string) {
    return await sendRequest<UserExist>({
        "url": '/users/login',
        "method": "POST",
        body: { phone, password },
    });
}

export async function createUser({ first_name, last_name, Email, phone, password, question, answer }: createUser) {
    return await sendRequest<createUser>({
        "url": `/users/register`,
        method: "POST",
        body: { first_name, last_name, Email, phone, password, question, answer },
    })

}
