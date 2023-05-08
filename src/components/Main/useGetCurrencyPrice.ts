import { getCoinUsdPrice } from 'api/getCoinUsdPrice';
import { useCallback } from 'react';

export const useGetCurrencyPrice = () => {
  const getCurrencyPrice = useCallback(
    async (
      currency: string
      // eslint-disable-next-line consistent-return
    ) => {
      try {
        const coinPrice = await getCoinUsdPrice(currency);

        const currencyPrice = coinPrice[currency].usd;

        return currencyPrice;
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const calculate = useCallback(
    async ({
      fromCurrency,
      intoCurrency,
      amount,
    }: {
      fromCurrency: string;
      intoCurrency: string;
      amount: number;
    }) => {
      const [fromCurrencyPrice, intoCurrencyPrice] = await Promise.all([
        getCurrencyPrice(fromCurrency),
        getCurrencyPrice(intoCurrency),
      ]);

      const calculationResult =
        amount * (fromCurrencyPrice! / intoCurrencyPrice!);

      return parseFloat(calculationResult.toFixed(2));
    },
    [getCurrencyPrice]
  );

  return {
    getCurrencyPrice,
    calculate,
  };
};
