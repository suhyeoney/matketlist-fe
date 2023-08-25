import { AxiosInstance } from 'axios';

export const get = <T, >(url: string, payload: object | number | string, instance: AxiosInstance) => {
  switch(typeof payload) {
    case 'object':
      if(Object.keys(payload).length !== 0) {
          const queryString: string = Object.entries(payload).map(e => e.join('=')).join('&');
          return instance.get<T>(`${ url }?${ queryString }`);
      } else {
          return instance.get<T>(`${ url }`);
      }
    case 'number':
      return instance.get<T>(`${ url }/${ payload }`);
    case 'string':
      return instance.get<T>(`${ url }/${ payload }`);
  }
};

export const post =<T, > (url: string, payload: object, instance: AxiosInstance) => {
  return instance.post<T>(url, payload);
};

export const _delete =<T, > (url: string, payload: object, instance: AxiosInstance) => {
  console.log('payload', payload);
  return instance.delete<T>(url, payload);
};