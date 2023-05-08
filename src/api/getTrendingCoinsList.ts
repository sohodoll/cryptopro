import { ITrendingCoinsList } from 'interfaces/ITrendingCoinsList';
import { request } from './request';

export const getTrendingCoinsList = () => {
  return request<ITrendingCoinsList>(
    'https://api.coingecko.com/api/v3/search/trending'
  );
};