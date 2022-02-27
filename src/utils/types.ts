export type Response = {
  ok: boolean;
  status: HttpStatusCode;
  meta: {
    type: string;
    httpStatus: string;
  };
  error?: {
    code: string;
    details: string;
    field: string;
    message: string;
    resource: string;
  };
  data?: object;
};

type HttpStatusCode = ['200', '401'];

export type RequestHeader = {
  method: string;
  mode: string;
  headers: {
    'Content-Type'?: string;
    Authorization: string;
  };
  timeout: number;
  data: object;
};
