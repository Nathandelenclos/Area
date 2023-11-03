import { toast } from "react-toastify";

const defaultApiHandler = {
  400: (data: any) => {
    console.log("[API INVOKE]: 400: ", data?.detail);
    toast("Bad request", { type: "error", autoClose: 4000 });
  },

  401: (data: any) => {
    toast(data?.message, {
      type: "error",
      autoClose: 4000,
    });
    console.log("[API INVOKE]: 401: ", data?.detail);
    toast("Unauthorized", { type: "error", autoClose: 4000 });
  },

  403: (data: any) => {
    console.log("[API INVOKE]: 403: ", data?.detail);
    toast("Forbidden", { type: "error", autoClose: 4000 });
  },

  409: (data: any) => {
    console.log("[API INVOKE]: 409: ", data?.detail);
    toast("User already exists", { type: "error", autoClose: 4000 });
  },

  422: (data: any) => {
    console.log("[API INVOKE]: 422: ", data?.detail);
  },

  500: (data: any) => {
    console.log("[API INVOKE]: 500: ", data?.detail);
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
