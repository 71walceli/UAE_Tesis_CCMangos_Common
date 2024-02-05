// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  ApiErrorResponse,
  AuthInterface,
  TokenResponse,
} from "../interfaces/models";
import { Endpoints } from "./routes";


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

  const ApiPostFileRequest = axios.create({
    baseURL: Endpoints.BaseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${UserData?.access_token}`,
    },
  });

  const getData = <T>(request: Promise<T>): Promise<T> => request
    .then(({ data }: AxiosResponse<T>) => data)
    .catch((e) => { throw e })
  const get = <T>(endpoint: string, params?: object,): Promise<T> => 
    getData(ApiRequest.get(endpoint, { params }));
  const post = <T>(endpoint: string, data?: object, params?: object): Promise<T> => 
    getData(ApiRequest.post(endpoint, data, { params }));
  const patch = <T>(endpoint: string, data?: object, params?: object): Promise<T> => 
    getData(ApiRequest.patch(endpoint, data, { params }));
  const remove = <T>(endpoint: string, params?: object): Promise<T> => 
    getData(ApiRequest.delete(endpoint, { params }));

  const postRequestToken = async <T extends TokenResponse>(
    data: AuthInterface
  ): Promise<T> => {
    return await ApiTokenRequest.request({
      data,
    })
      .then(({ data }: AxiosResponse<T>) => {
        login(data);
        console.log(data);
        return data;
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        console.log(JSON.stringify(error, null, 3));
        throw error;
      })
  };

  const postFileRequest = async <T>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    return await ApiPostFileRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        throw error;
      })
  };

  return { get, post, patch, remove, postRequestToken, postFileRequest };
};
