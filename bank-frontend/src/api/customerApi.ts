import axiosInstance from './axiosInstance';
import { Client } from '../types/client';

export const fetchClients = async (): Promise<Client[]> => {
  const response = await axiosInstance.get<Client[]>('/customers');
  return response.data;
};

export const addClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
  const response = await axiosInstance.post<Client>('/customers', client);
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await axiosInstance.get<Client>(`/customers/${id}`);
  return response.data;
};