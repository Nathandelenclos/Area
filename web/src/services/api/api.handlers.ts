import { toast } from "react-toastify";

/**
 * Default API handlers
 * @description Default API handlers
 */
const defaultApiHandler = {
  400: (data: any) => {
    console.log("[API INVOKE]: 400: ", data?.message);
    toast("Bad request", { type: "error", autoClose: 4000 });
  },

  401: (data: any) => {
    console.log("[API INVOKE]: 401: ", data?.message);
    toast("Unauthorized", { type: "error", autoClose: 4000 });
  },

  403: (data: any) => {
    console.log("[API INVOKE]: 403: ", data?.message);
    toast("Forbidden", { type: "error", autoClose: 4000 });
  },

  409: (data: any) => {
    console.log("[API INVOKE]: 409: ", data?.message);
    toast("User already exists", { type: "error", autoClose: 4000 });
  },

  422: (data: any) => {
    console.log("[API INVOKE]: 422: ", data?.message);
  },

  500: (data: any) => {
    console.log("[API INVOKE]: 500: ", data?.message);
    toast("Internal server error", { type: "error", autoClose: 4000 });
  },

  defaultHandlers: (data: any) => {
    console.log("[API INVOKE]: default: ", data);
    toast(data?.message, {
      type: "error",
      autoClose: 4000,
    });
  },
};

export default defaultApiHandler;
