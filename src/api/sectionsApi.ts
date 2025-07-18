import { Section } from '../types/section';
import axiosInstance from './axiosInstance';

export async function getSections(): Promise<Section[]> {
  const res = await axiosInstance.post('/MstLookUpData/Authorize');
  return res.data;
}

export async function getWorkOrderByProductCode(productCode: string) {
  const response = await axiosInstance.get(`/WorkOrders/woByCode`, {
    params: { productCode },
  });
  return response.data;
} 