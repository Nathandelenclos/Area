import { env } from '@src/env';

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
  let response;

  try {
    response = await methods[method]({
      endpoint: endpoint,
      body: body,
      authToken: authToken,
    });
  } catch (e) {
    response = new Response(null, {
      status: 500,
    });
  }
  return HandleResponse(response, expectedStatus, handlers);
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

function ApiGet(props: ApiGetProps): Promise<Response> {
  return fetch(`${env.API_URL}${props.endpoint}`, {
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
function ApiPost(props: ApiPostProps): Promise<Response> {
  return fetch(`${env.API_URL}${props.endpoint}`, {
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
  let resp = null;

  try {
    // Data is read as JSON. If it fails, it will be null. HTML responses are not handled for now.
    resp = await response.json();
  } catch (e) {
    console.warn('[API INVOKE]: Failed to parse response body: ', e);
  }

  if (!handlers || response.status === expectedStatus) {
    return { status: response.status, data: resp?.data };
  }

  // Handle non-successful responses with custom handlers
  if (handlers[response.status]) {
    handlers[response.status](resp);
  } else {
    handlers.defaultHandlers(resp);
  }
  return { status: response.status, data: null };
}
