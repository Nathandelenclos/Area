import { toast } from "react-toastify";

const defaultApiHandler = {
  401: (data: any) => {
    toast(data?.message, {
      type: "error",
      autoClose: 4000,
    });
    console.log("[API INVOKE]: 401: ", data?.detail);
  },

  422: (data: any) => {
    console.log("[API INVOKE]: 422: ", data?.detail);
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
