import { API_URL } from "@src/Constants";
import defaultApiHandler from "@services/api/api.handlers";

/**
 * IApiInvokeProps
 * @description IApiInvokeProps is the interface for the ApiInvoke function
 */
type IApiInvokeProps = {
  /**
   * The endpoint to call
   */
  endpoint: string;
  /**
   * The HTTP method to use
   */
  method: string;
  /**
   * The expected status code
   */
  expectedStatus: number;
  /**
   * The body of the request
   */
  body?: any;
  /**
   * The auth token to use
   */
  authToken?: string;
  /**
   * Custom handlers for non-successful responses
   */
  handlers?: any;
};

/**
 * IApiInvokeResponse
 * @description IApiInvokeResponse is the interface for the ApiInvoke response
 */
export type IApiInvokeResponse = {
  /**
   * The status code of the response
   */
  status: number;
  /**
   * The data of the response
   */
  data: any;
};

/**
 * Methods to call the API
 */
const methods: any = {
  GET: ApiGet,
  POST: ApiPost,
  DELETE: ApiDelete,
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
  handlers = defaultApiHandler,
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

/**
 * ApiGetProps
 * @description ApiGetProps is the interface for the ApiGet function
 */
type ApiGetProps = {
  /**
   * The endpoint to call
   */
  endpoint: string;
  /**
   * The auth token to use
   */
  authToken?: string;
};

/**
 * Sends a GET request to the API.
 * @param {ApiGetProps} props
 * @returns {Promise} with the response object
 */
function ApiGet(props: ApiGetProps): Promise<Response> {
  return fetch(`${API_URL}${props.endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

/**
 * ApiPostProps
 * @description ApiPostProps is the interface for the ApiPost function
 */
type ApiPostProps = {
  /**
   * The endpoint to call
   */
  endpoint: string;
  /**
   * The body of the request
   */
  body: any;
  /**
   * The auth token to use
   */
  authToken?: string;
};

/**
 * Sends a POST request to the API.
 * @param {ApiPostProps} props
 * @returns {Promise} with the response object
 */
function ApiPost(props: ApiPostProps): Promise<Response> {
  return fetch(`${API_URL}${props.endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: props.body,
  });
}

/**
 * Sends a DELETE request to the API.
 * @param {ApiPostProps} props
 * @returns {Promise} with the response object
 */
function ApiDelete(props: ApiPostProps): Promise<Response> {
  return fetch(`${API_URL}${props.endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
    console.warn("[API INVOKE]: Failed to parse response body: ", e);
  }

  if (!handlers || response.status === expectedStatus) {
    return { status: response.status, data: data?.data ?? data };
  }

  // Handle non-successful responses with custom handlers
  if (handlers[response.status]) {
    handlers[response.status](data);
  } else {
    handlers.defaultHandlers(data);
  }
  return { status: response.status, data: null };
}
