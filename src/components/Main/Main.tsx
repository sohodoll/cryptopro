import { coinsList } from 'api/getCoins';
import { useState, useEffect } from 'react';
import { getCoinCoefficient } from 'api/getCoinCoefficient';
import styles from './styles.module.css';

type CoinType = {
  id: string;
  name: string;
  symbol: string;
};

type CoinObjectType = {
  item: CoinType;
};

const defaultCurrency = coinsList.coins[0].item.id;

const coinsElements = coinsList.coins.map((coin: CoinObjectType) => (
  <option key={coin.item.id}>{coin.item.id}</option>
));

export function Main() {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(defaultCurrency);
  const [intoCurrency, setIntoCurrency] = useState(defaultCurrency);
  const [fromCurrencyPrice, setFromCurrencyPrice] = useState(0);
  const [intoCurrencyPrice, setIntoCurrencyPrice] = useState(0);

  useEffect(() => {
    async function getPrice() {
      const fromCoinPricePromise = await getCoinCoefficient(fromCurrency);
      const intoCoinPricePromise = await getCoinCoefficient(intoCurrency);

      const fromCoinPrice = await fromCoinPricePromise;
      const intoCoinPrice = await intoCoinPricePromise;

      setFromCurrencyPrice(await fromCoinPrice[fromCurrency].usd);
      setIntoCurrencyPrice(await intoCoinPrice[intoCurrency].usd);
    }
    getPrice();
  }, [fromCurrency, intoCurrency]);

  const onCalculate = () => {
    const calculationResult = amount * (fromCurrencyPrice / intoCurrencyPrice);

    setResult(parseFloat(calculationResult.toFixed(2)));
  };

  return (
    <div className={styles.main}>
      <div className="flex flex-col gap-5">
        <form className="flex gap-5" action="none">
          <label className="" htmlFor="amount">
            Amount:
          </label>
          <input
            className="border border-black"
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
            className="border border-black"
            name="fromCurrency"
            id="fromCurrency"
            onChange={(e) => {
              setFromCurrency(e.target.value);
            }}
          >
            {coinsElements}
          </select>
          <select
            className="border border-black"
            name="intoCurrency"
            id="intoCurrency"
            onChange={(e) => {
              setIntoCurrency(e.target.value);
            }}
          >
            {coinsElements}
          </select>
        </form>
        <div className="flex gap-5">
          <div>Result:</div>

          <span id="result" className="w-40 h-6 border border-black">
            {result}
          </span>
          <button
            onClick={onCalculate}
            type="button"
            className="border border-blue"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
