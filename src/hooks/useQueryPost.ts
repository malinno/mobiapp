import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export function useQueryPost<T = any, V = any>(
  url: string,
  options?: UseMutationOptions<T, unknown, V>
) {
  return useMutation<T, unknown, V>({
    mutationFn: async (variables: V) => {
      const res = await axiosInstance.post(url, variables);
      return res.data;
    },
    ...options,
  });
} 