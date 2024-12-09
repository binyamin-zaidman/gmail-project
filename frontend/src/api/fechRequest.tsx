type Method = "GET" | "POST" | "PUT" | "DELETE";

type props = {
    url: string,
    method: Method,
    body?: any
};

async function fechRequest<T>(props: props | string): Promise<T | Error> {
    let url: string, method: Method, body: any;

    if (typeof props === 'string') {
        url = props;
        method = 'GET';
    } else {
        url = props.url;
        method = props.method;
        body = props.body;
    }

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };


    if (body && method !== 'DELETE') {
        options.body = JSON.stringify(body);
    }
    try {
        const res = await fetch(url, options);

        if (!res.ok) throw new Error(`api HTTP error! status: ${res.status}`);

        const data = await res.json() as T;

        return data;
    } catch (error) {
        return error as Error;
    }


}
export default fechRequest