type Method = "GET" | "POST" | "PUT" | "DELETE";

type RequestProps = {
    url: string,
    method: Method,
    body?: any
    token?: string;
};

async function fetchRequest<T>(props: RequestProps | string): Promise<T> {
    let url: string, method: Method = "GET", body: any = null, token: string | undefined;

    if (typeof props === 'string') {
        url = props;
        console.log(props);

    } else {
        url = props.url;
        method = props.method;
        body = props.body;
        token = props.token;
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
        const res = await fetch(url, options);
        console.log(res);

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`HTTP Error ${res.status}: ${error}`);
        }

        if (res.status === 204) return undefined as T;
        const data = await res.json() as T;

        return data;
    } catch (error) {
        throw new Error(`FetchRequest failed: ${(error as Error).message}`);
    }
}
export default fetchRequest