import { ICoinUsdPrice } from 'interfaces/ICoinUsdPrice';
import { request } from './request';

export const getCoinUsdPrice = async (coinId: string) => {
  return request<ICoinUsdPrice>(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );
};
