import sendRequest from "./fetchRequest";

type UserExist = {
    email: string;
    password: string
    token: string
}
export async function getUserExist(phone: string, password: string) {
    return await sendRequest<UserExist>({
        "url": '/users/login',
        "method": "GET",
        "body": { phone, password }
    });

}   