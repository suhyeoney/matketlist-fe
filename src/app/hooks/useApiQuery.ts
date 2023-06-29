import { useQuery } from 'react-query';

export const useGetQuery = (queryKey: Array<any>, queryFunction: any, options: object) => {
  // queryKey length = 1 : 별도의 requestParameter없이 키만 존재.
  return useQuery(
    queryKey.length === 1 ? queryKey[0] : queryKey, 
    queryFunction, 
    options
  );
};