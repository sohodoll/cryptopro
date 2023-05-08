import { useState, useCallback, useMemo } from 'react';
import { useGetDefaultCurrency } from '../useGetDefaultCurrency';
import { useGetCurrencyPrice } from '../useGetCurrencyPrice';

export const SelectCalculator = () => {
  const { defaultCurrency, trendingCoinsList } = useGetDefaultCurrency();

  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [intoCurrency, setIntoCurrency] = useState<string>();

  const { calculate } = useGetCurrencyPrice();

  const coinsElements = useMemo(() => {
    return trendingCoinsList?.coins.map((coin) => (
      <option key={coin.item.id}>{coin.item.id}</option>
    ));
  }, [trendingCoinsList]);

  const onCalculate = useCallback(async () => {
    try {
      const calculationResult = await calculate({
        fromCurrency: fromCurrency ?? defaultCurrency ?? '',
        intoCurrency: intoCurrency ?? defaultCurrency ?? '',
        amount,
      });

      setResult(calculationResult);
    } catch (error) {
      console.error(error);
    }
  }, [amount, fromCurrency, intoCurrency, defaultCurrency, calculate]);

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
          defaultValue={defaultCurrency}
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
          defaultValue={defaultCurrency}
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
