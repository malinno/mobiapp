import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export function useQueryGet<T = any>(
  key: string | any[],
  url: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
    ...options,
  });
} 