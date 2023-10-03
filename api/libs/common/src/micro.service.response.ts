type MicroServiceHttpCodeProps = {
  code?: number;
  message?: string;
  data?: any;
};

class MicroServiceResponse {
  code: number;
  message: string;
  data: any;

  constructor(props: MicroServiceHttpCodeProps) {
    this.code = props.code || 200;
    this.message = props.message || 'OK';
    this.data = props.data || null;
  }

  /**
   * Returns the JSON representation of the response if the data is not null
   */
  getJSON() {
    if (this.data !== null) return this.data;
  }

  /**
   * Returns the HTTP status code of the response
   */
  getStatus() {
    return this.code;
  }
}

export default MicroServiceResponse;
