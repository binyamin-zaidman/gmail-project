import sendRequest from "./fetchRequest";
import { messege } from "./messege";

type UserExist = {
  phone: string;
  token: string;
  email: string;
  password: string;
  question: string;
  answer: string;
  user_name: string;
  id: number;
};

type formData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  question: string;
  answer: string;
  user_name?: string;
};

type userData = {
  id: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  question: string;
  answer: string;
};
export type userExist = { user_id: string; token: string };
export type sendRequestTypes =
  | formDataWithToken
  | userExist
  | messege[]
  | userData;
export type formDataWithToken = formData & { token: string; id: number };

export async function UserLogged() {
  return await sendRequest<string>({
    url: `/users/isLogged`,
    method: "GET"
  });
}

export async function getUserExist(phone: string, password: string) {
  return (await sendRequest<UserExist>({
    url: "/users/login",
    method: "POST",
    body: { phone, password }
  })) as userExist;
}

export async function createUser({
  firstName,
  lastName,
  email,
  phone,
  password,
  question,
  answer
}: formData): Promise<formDataWithToken> {
  return (await sendRequest<formData>({
    url: `/users/register`,
    method: "POST",
    body: { firstName, lastName, email, phone, password, question, answer }
  })) as formDataWithToken;
}

export async function getUserDetails(userId: string) {
  return await sendRequest<object>({
    url: `/app/${userId}`,
    method: "GET"
  });
}

export async function getUserByPhone(namByPHone: string) {
  return await sendRequest<string>({
    url: `/users/getByPhone`,
    method: "POST",
    body: { phone: namByPHone }
  });
}
export async function getUserForIdentification(phone: string) {
  return await sendRequest<string>({
    url: `/users/passwordRecovery`,
    method: "POST",
    body: { phone }
  });
}

export async function restartPassword(
  id: string,
  answer: string,
  password: string
) {
  return await sendRequest<userData>({
    url: `/users/restart`,
    method: "POST",
    body: { id, answer, password }
  });
}
