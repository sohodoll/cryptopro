import { getTrendingCoinsList } from 'api/getTrendingCoinsList';
import { useState, useEffect, useCallback } from 'react';
import { getCoinUsdPrice } from 'api/getCoinUsdPrice';

const trendingCoinsList = await getTrendingCoinsList();
const defaultCurrency: string = trendingCoinsList.coins[0].item.id;

const coinsElements = trendingCoinsList.coins.map((coin) => (
  <option key={coin.item.id}>{coin.item.id}</option>
));

export const SelectCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(defaultCurrency);
  const [intoCurrency, setIntoCurrency] = useState(defaultCurrency);
  const [fromCurrencyPrice, setFromCurrencyPrice] = useState(0);
  const [intoCurrencyPrice, setIntoCurrencyPrice] = useState(0);

  const getPrice = useCallback(async () => {
    try {
      const [fromCoinPrice, intoCoinPrice] = await Promise.all([
        getCoinUsdPrice(fromCurrency),
        getCoinUsdPrice(intoCurrency),
      ]);

      setFromCurrencyPrice(fromCoinPrice[fromCurrency].usd);
      setIntoCurrencyPrice(intoCoinPrice[intoCurrency].usd);
    } catch (error) {
      console.error(error);
    }
  }, [fromCurrency, intoCurrency]);

  useEffect(() => {
    getPrice();
  }, [fromCurrency, intoCurrency, getPrice]);

  const onCalculate = useCallback(() => {
    const calculationResult = amount * (fromCurrencyPrice / intoCurrencyPrice);
    const formattedResult = parseFloat(calculationResult.toFixed(2));

    setResult(formattedResult);
  }, [amount, fromCurrencyPrice, intoCurrencyPrice]);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex gap-5 text-xl items-center" action="none">
        <label className="" htmlFor="amount">
          Amount:
        </label>
        <input
          className="border border-gray-300 rounded"
          type="number"
          name="amount"
          id="amount"
          onInput={(e) => {
            const { target } = e;
            if (target instanceof HTMLInputElement) {
              setAmount(Number(target.value));
            }
          }}
        />
        <select
          className="border border-black rounded"
          name="fromCurrency"
          id="fromCurrency"
          onChange={(e) => {
            setFromCurrency(e.target.value);
          }}
        >
          {coinsElements}
        </select>
        <select
          className="border border-black rounded"
          name="intoCurrency"
          id="intoCurrency"
          onChange={(e) => {
            setIntoCurrency(e.target.value);
          }}
        >
          {coinsElements}
        </select>
      </form>
      <div className="text-xl font-bold flex gap-5 items-center justify-center">
        <div>Result:</div>

        <span id="result" className="w-40">
          {result}
        </span>
        <button
          onClick={onCalculate}
          type="button"
          className="flex items-center h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};
