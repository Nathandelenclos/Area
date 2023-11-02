import { toast } from "react-toastify";
import internal from "stream";

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
