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

  getJSON() {
    if (this.data !== null) return this.data;
  }

  getStatus() {
    return this.code;
  }
}

export default MicroServiceResponse;
