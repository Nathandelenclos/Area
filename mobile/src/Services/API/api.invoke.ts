import {CONST_API_URL} from './api.constants';

interface IApiInvokeProps {
    endpoint: string;
    method: string;
    expectedStatus: number;

    body?: any;
    authToken?: string;
    handlers?: any; // As follow {200: () => {}, 404: () => {}, ...}
}

export interface IApiInvokeResponse {
    status: number;
    data: any;
}

const methods: any = {
    GET: ApiGet,
    POST: ApiPost
};

export async function ApiInvoke({
    endpoint,
    method,
    expectedStatus,
    body,
    authToken,
    handlers
}: IApiInvokeProps): Promise<IApiInvokeResponse> {
    const response = await methods[method]({
        endpoint: endpoint,
        body: body,
        authToken: authToken
    });

    const handledResponse = await HandleResponse(
        response,
        expectedStatus,
        handlers
    );

    if (handledResponse.data === null) {
        console.warn(
            `[API INVOKE]: Failed to fetch ${endpoint} (status: ${handledResponse.status}, expected: ${expectedStatus})`
        );
    }
    return handledResponse;
}

async function ApiGet(props: {endpoint: string; authToken?: string}) {
    return await fetch(`${CONST_API_URL}/${props.endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${props.authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

async function ApiPost(props: {
    endpoint: string;
    body: any;
    authToken?: string;
}) {
    return await fetch(`${CONST_API_URL}/${props.endpoint}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${props.authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: props.body
    });
}

async function HandleResponse(
    response: Response,
    expectedStatus: number,
    handlers?: any
): Promise<IApiInvokeResponse> {
    let data = null;

    try {
        // Data is read as JSON. If it fails, it will be null. HTML responses are not handled for now.
        data = await response.json();
    } catch (e) {
        console.warn('[API INVOKE]: Failed to parse response body: ', e);
    }

    // Handle non-successful responses with custom handlers
    (await handlers) &&
        handlers[response.status] &&
        handlers[response.status](data);
    return {status: response.status, data: data};
}
