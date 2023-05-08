import { ICoin } from 'interfaces';
import { request } from './request';

export const getFullCoinsList = () => {
  return request<ICoin[]>('https://api.coingecko.com/api/v3/coins/list');
};