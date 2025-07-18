import { Section } from '../types/section';
import axiosInstance from './axiosInstance';

export async function getSections(): Promise<Section[]> {
  const res = await axiosInstance.post('/MstLookUpData/Authorize');
  return res.data;
} 