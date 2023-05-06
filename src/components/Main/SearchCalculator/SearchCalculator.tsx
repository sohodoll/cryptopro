import { getCoinUsdPrice } from 'api/getCoinUsdPrice';
import { getFullCoinsList } from 'api/getFullCoinsList';
import { getTrendingCoinsList } from 'api/getTrendingCoinsList';
import bg from 'assets/images/bitcoin-bg.png';
import { useCallback, useEffect, useState } from 'react';

const trendingCoinsList = await getTrendingCoinsList();
const defaultCurrency: string = trendingCoinsList.coins[0].item.id;
const fullCoinsList = await getFullCoinsList();

export const SearchCalculator = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchAmount, setSearchAmount] = useState(0);
  const [searchResult, setSearchResult] = useState(0);
  const [fromSearchCurrency, setFromSearchCurrency] = useState(defaultCurrency);
  const [intoSearchCurrency, setIntoSearchCurrency] = useState(defaultCurrency);
  const [fromSearchCurrencyPrice, setFromSearchCurrencyPrice] = useState(0);
  const [intoSearchCurrencyPrice, setIntoSearchCurrencyPrice] = useState(0);

  const matchCoinSymbol = (symbol: string) => {
    const coinObject = fullCoinsList.filter((coin) => coin.symbol === symbol);
    return coinObject[0].id;
  };

  const onSearchCalculate = async () => {
    const searchArray = searchPrompt.split(' ');
    const searchPromptAmount = Number(searchArray[0]);
    const fromSearchSymbol = searchArray[1];
    const intoSearchSymbol = searchArray[3];

    setFromSearchCurrency(matchCoinSymbol(fromSearchSymbol));
    setSearchAmount(searchPromptAmount);

    setTimeout(async () => {
      if (intoSearchSymbol === 'usd') {
        const usdCoinPrice = await getCoinUsdPrice(fromSearchCurrency);
        const calculationResult =
          searchAmount * usdCoinPrice[fromSearchCurrency].usd;
        setSearchResult(calculationResult);
      } else {
        setIntoSearchCurrency(matchCoinSymbol(searchArray[3]));
        const calculationResult =
          searchAmount * (fromSearchCurrencyPrice / intoSearchCurrencyPrice);
        setSearchResult(parseFloat(calculationResult.toFixed(2)));
      }
    }, 2000);
  };

  const getSearchPrice = useCallback(async () => {
    try {
      const [fromSearchCoinPrice, intoSearchCoinPrice] = await Promise.all([
        getCoinUsdPrice(fromSearchCurrency),
        getCoinUsdPrice(intoSearchCurrency),
      ]);

      setFromSearchCurrencyPrice(fromSearchCoinPrice[fromSearchCurrency].usd);
      setIntoSearchCurrencyPrice(intoSearchCoinPrice[intoSearchCurrency].usd);
    } catch (error) {
      console.error(error);
    }
  }, [fromSearchCurrency, intoSearchCurrency]);

  useEffect(() => {
    getSearchPrice();
  }, [fromSearchCurrency, intoSearchCurrency, getSearchPrice]);

  return (
    <div className="flex items-center justify-center">
      <img className="w-80" src={bg} alt="bg" />
      <form method="GET">
        <div className="flex gap-4 items-center relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
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
            onClick={onSearchCalculate}
          >
            Calculate
          </button>
        </div>
        <div id="search-result">
          <span>{searchResult}</span>
        </div>
      </form>
    </div>
  );
};
