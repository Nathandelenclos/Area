const defaultApiHandler = {
  401: async (data: any) => {
    console.log('[API INVOKE]: 401: ', data?.detail);
  },

  422: async (data: any) => {
    console.log('[API INVOKE]: 422: ', data?.detail);
  },
};

export default defaultApiHandler;
