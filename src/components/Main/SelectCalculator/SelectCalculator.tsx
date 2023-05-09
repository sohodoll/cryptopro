import { useState, useCallback, useMemo } from 'react';
import { useGetDefaultCurrency } from '../useGetDefaultCurrency';
import { useGetCurrencyPrice } from '../useGetCurrencyPrice';

export const SelectCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState<number | string>(0);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [intoCurrency, setIntoCurrency] = useState<string>();

  const { calculate } = useGetCurrencyPrice();
  const { defaultCurrency, trendingCoinsList } = useGetDefaultCurrency();

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
      setResult('Too many requests. Please Wait.');
    }
  }, [amount, fromCurrency, intoCurrency, defaultCurrency, calculate]);

  return (
    <div className="flex flex-col gap-5 items-center mb-10">
      <div className="font-bold text-3xl">Or check out the trending coins</div>
      <form
        className="flex gap-5 text-xl items-center mt-12 md:flex-col"
        action="none"
      >
        <label className="" htmlFor="amount">
          Amount:
        </label>
        <input
          className="border border-gray-300 rounded md:w-40"
          type="number"
          name="amount"
          id="amount"
          min={0}
          onInput={(e) => {
            const { target } = e;
            if (target instanceof HTMLInputElement) {
              setAmount(Number(target.value));
            }
          }}
        />
        <select
          className="border border-gray-300 rounded font-bold"
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
          className="border border-gray-300 rounded font-bold"
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

        <span id="result">{result}</span>
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
