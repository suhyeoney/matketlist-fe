import instance from './axios';

export const get = <T, >(url: string, payload: object | number | string) => {
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

export const post = (url: string, payload: object | number | string) => {
  return instance.post(url, payload);
};