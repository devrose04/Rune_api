import axios from 'axios';
import { isObject } from 'lodash';

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
  params?: unknown;
  body?: unknown;
  type?: RequestType;
}

interface IGenericObject {
  [key: string]: any;
}

export const callApi = async <T extends IGenericObject>({
  baseUrl = 'http://localhost:3000',
  body = {},
  params = {},
  type = RequestType.Get,
  endpoint,
}: ICallApi): Promise<T> => {
  const url = `${baseUrl}/dev/${endpoint}`;
  let response: T;

  switch (type) {
    case RequestType.Get:
      response = (await axios.get<T>(url, { params })).data;
      break;
    case RequestType.Post:
      response = (await axios.post<T>(url, body, { params })).data;
      break;
    case RequestType.Delete:
      response = (await axios.delete<T>(url, { data: body })).data;
      break;
    case RequestType.Put:
      response = (await axios.put<T>(url, body)).data;
      break;
    default:
      throw new Error(`Request type "${type}" not supported.`);
  }

  if (isObject(response) && response?.message) {
    throw new Error(response.message);
  }

  return response;
};
