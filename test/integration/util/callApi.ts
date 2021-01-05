import axios from 'axios';
import { name } from '../../../package.json';
import { IApiContract } from '../../../src/types/IApiContract';

export enum RequestType {
  Post = 'post',
  Get = 'get',
  Delete = 'delete',
  Put = 'put',
}

export enum Endpoints {
  Add = 'add',
}

export interface ICallApi {
  endpoint: string;
  baseUrl?: string;
  params?: any;
  body?: any;
  type?: RequestType;
}

export const callApi = async <T = any>({
  baseUrl = 'http://localhost:3002',
  body = {},
  params = {},
  type = RequestType.Get,
  endpoint,
}: ICallApi): Promise<IApiContract<T>> => {
  const url = `${baseUrl}/2015-03-31/functions/${name}-dev-${endpoint}/invocations`;
  switch (type) {
    case RequestType.Get:
      return (await axios.get(url, { params })).data;
    case RequestType.Post:
      return (await axios.post(url, body, { params })).data;
    default:
      throw new Error(`Request type "${RequestType}" not supported.`);
  }
};
