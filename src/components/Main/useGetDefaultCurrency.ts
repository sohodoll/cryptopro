import { getTrendingCoinsList } from 'api/getTrendingCoinsList';
import { ITrendingCoinsList } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';

export const useGetDefaultCurrency = () => {
  const [trendingCoinsList, setTrendingCoinsList] =
    useState<ITrendingCoinsList>();

  const getDefaultCurrency = useCallback(async () => {
    try {
      const coinsList = await getTrendingCoinsList();

      setTrendingCoinsList(coinsList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getDefaultCurrency();
  }, [getDefaultCurrency]);

  return {
    trendingCoinsList,
    defaultCurrency: trendingCoinsList?.coins[0].item.id,
  };
};
