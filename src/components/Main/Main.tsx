import { coinsList } from 'api/getCoins';
import { useState, useEffect } from 'react';
import { getCoinCoefficient } from 'api/getCoinCoefficient';
import bg from 'assets/images/bitcoin-bg.png';
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

  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchAmount, setSearchAmount] = useState(0);

  const onSearchButtonClick = () => {
    const searchArray = searchPrompt.split(' ');
    setSearchAmount(Number(searchArray[0]));
  };

  return (
    <div className={styles.main}>
      <div className="flex items-center justify-center">
        <img className="w-80" src={bg} alt="bg" />
        <form method="GET">
          <div className="flex gap-4 items-center relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="border border-gray-800 py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="2 btc in usd"
              autoComplete="off"
              onChange={(e) => {
                const { target } = e;
                if (target instanceof HTMLInputElement) {
                  setSearchPrompt(target.value);
                }
              }}
            />
            <button
              type="button"
              className="flex items-center h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
              onClick={onSearchButtonClick}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
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
    </div>
  );
}
