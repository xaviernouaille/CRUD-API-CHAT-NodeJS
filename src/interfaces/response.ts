interface IResponseSuccess {
  msg: string;
  data: object | null;
  rType: "success";
}

interface IResponseError {
  msg: string;
  value: string;
  param: string;
  rType: "error";
}

type IResponse = IResponseSuccess | IResponseError[];
export default IResponse;
