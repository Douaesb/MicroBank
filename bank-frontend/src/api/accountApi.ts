import axiosInstance from './axiosInstance';
import { Account } from '../types/account';



export const getAccountById = async (id: number): Promise<Account> => {
    const response = await axiosInstance.get<Account>(`/accounts/${id}`);
    return response.data;
  };

export const createAccount = async (account: Omit<Account, 'id'>): Promise<Account> => {
  const response = await axiosInstance.post<Account>('/accounts', account);
  return response.data;
};

export const fetchAccountsByClientId = async (clientId: number): Promise<Account[]> => {
  const response = await axiosInstance.get<Account[]>(`/accounts/customer/${clientId}`);
  return response.data;
};