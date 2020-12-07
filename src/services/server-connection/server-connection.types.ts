import { Rest } from './rest';
import type { AxiosRequestConfig } from 'axios';
import { ServerRequestKeys } from '../../../../deftr--public-api/src';

/**
 * Defines the exports of the rest module
 */
export interface RestModule {
  ['Rest']: new () => Rest;
}

/**
 * Maps all server request keys to Axios supported rest methods.
 * Meaning that objects that realize this interface will have to
 * define a rest method for each key in the ServerRequest interface
 */
export type RestRequestMap = {
  [route in ServerRequestKeys]: Exclude<
    AxiosRequestConfig['method'],
    undefined
  >;
};

export interface ServerConnection {
  method: 'websocket' | 'rest';
}

export type ServerConnectionActions = ServerConnection['method'];
