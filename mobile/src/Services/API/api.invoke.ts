import { CONST_API_URL } from './api.constants';

type IApiInvokeProps = {
  endpoint: string;
  method: string;
  expectedStatus: number;

  body?: any;
  authToken?: string;
  handlers?: any; // As follow {200: () => {}, 404: () => {}, ...}
};

export type IApiInvokeResponse = {
  status: number;
  data: any;
};

const methods: any = {
  GET: ApiGet,
  POST: ApiPost,
};

/**
 * Invokes the API with the given parameters.
 * @param endpoint The endpoint to call
 * @param method The HTTP method to use
 * @param expectedStatus The expected status code
 * @param body The body of the request
 * @param authToken The auth token to use
 * @param handlers Custom handlers for non-successful responses
 * @returns { status, data } The response object
 */
export async function ApiInvoke({
  endpoint,
  method,
  expectedStatus,
  body,
  authToken,
  handlers,
}: IApiInvokeProps): Promise<IApiInvokeResponse> {
  const response = await methods[method]({
    endpoint: endpoint,
    body: body,
    authToken: authToken,
  });

  const handledResponse = await HandleResponse(
    response,
    expectedStatus,
    handlers,
  );

  if (handledResponse.data === null) {
    console.warn(
      `[API INVOKE]: Failed to fetch ${endpoint} (status: ${handledResponse.status}, expected: ${expectedStatus})`,
    );
  }
  return handledResponse;
}

type ApiGetProps = {
  endpoint: string;
  authToken?: string;
};

/**
 * Sends a GET request to the API.
 * @param {ApiGetProps} props
 * @returns {Promise} with the response object
 */

function ApiGet(props: ApiGetProps) {
  return fetch(`${CONST_API_URL}/${props.endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

type ApiPostProps = {
  endpoint: string;
  body: any;
  authToken?: string;
};

/**
 * Sends a POST request to the API.
 * @param {ApiPostProps} props
 * @returns {Promise} with the response object
 */
function ApiPost(props: ApiPostProps) {
  return fetch(`${CONST_API_URL}/${props.endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: props.body,
  });
}

/**
 * Handles the response of the API call.
 * @param response The response object
 * @param expectedStatus The expected status code
 * @param handlers Custom handlers for non-successful responses
 * @returns { status, data } The response object
 */
async function HandleResponse(
  response: Response,
  expectedStatus: number,
  handlers?: any,
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
  return { status: response.status, data: data };
}
