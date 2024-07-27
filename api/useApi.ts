import axios, { AxiosError, AxiosResponse } from "axios";

import { ApiErrorResponse, AuthInterface, TokenResponse, } from "../interfaces/models";
import { Endpoints } from "./routes";
import { PromiseQueue } from '../../../Common/utils/FifoPromiseQueue';


export const useApiController = (authContext) => {
  //#region AxiosConfig
  const { login,  UserData } = authContext;
  const ApiTokenRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.login,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const ApiRequest = axios.create({
    baseURL: Endpoints.BaseURL,
    headers: {
      "Content-Type": "application/json",
      ...(UserData?.access_token !== ""  && UserData?.access_token !==undefined? { Authorization: `Bearer ${UserData?.access_token}` } : {}),
    },
  });

  const queue = new PromiseQueue();

  const doRequest = <T>(request: Promise<T>): Promise<T> => queue.enqueue(() => request)
    .then(({ data }: AxiosResponse<T>) => data)
    .catch((e) => { throw e })
  const get = <T>(endpoint: string, params?: object,): Promise<T> => 
    doRequest(ApiRequest.get(endpoint, { params }));
  const post = <T>(endpoint: string, data?: object, params?: object): Promise<T> => 
    doRequest(ApiRequest.post(endpoint, data, { params }));
  const patch = <T>(endpoint: string, data?: object, params?: object): Promise<T> => 
    doRequest(ApiRequest.patch(endpoint, data, { params }));
  const remove = <T>(endpoint: string, params?: object): Promise<T> => 
    doRequest(ApiRequest.delete(endpoint, { params }));

  const putFile = (endpoint: string, file, options) => {
    doRequest(ApiRequest.put(endpoint, file, {
      headers: {
        "Content-Disposition": `attachment; filename=Screenshot_20240409_124452.png`
      },
    }))
  }

  return { get, post, patch, remove, putFile };
};
