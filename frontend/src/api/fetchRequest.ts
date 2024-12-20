import { formDataWithToken, sendRequestTypes } from "./users";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type RequestProps = {
    url: string,
    method: string,
    body?: any
    token?: string;
};

async function fetchRequest<T>(props: RequestProps | string): Promise<sendRequestTypes>  {
    let url: string, method: string = "GET", body: any = null, token: string | undefined;

if (typeof props === 'string' ) {
        url = props;
        method = "GET";

    } else {
        url = props.url;
        method = props.method;
        body = props?.body;
        token = props?.token;
    }

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };


    if (body && method !== 'DELETE' && method !== 'GET') {
        options.body = JSON.stringify(body);
    }
    try {
        const res = await fetch(`http://localhost:3000${url}`, options);
            
        if (!res.ok) {
            const error = await res.text();
            throw new Error(`HTTP Error ${res.status}: ${error}`);
        }

        if (res.status === 204) throw new Error("The content is empty");
        const data = await res.json() as sendRequestTypes;

        return data;
    } catch (error) {
        throw new Error(`FetchRequest failed: ${(error as Error).message}`);
    }
}
export default fetchRequest