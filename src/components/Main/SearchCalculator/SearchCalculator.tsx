import { getCoinUsdPrice } from 'api/getCoinUsdPrice';
import { getFullCoinsList as fetchFullCoinsList } from 'api/getFullCoinsList';
import bg from 'assets/images/bitcoin-bg.png';
import { useCallback, useEffect, useState } from 'react';
import { ICoin } from 'interfaces';

export const SearchCalculator = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchResult, setSearchResult] = useState(0);

  const [fullCoinsList, setFullCoinsList] = useState<ICoin[]>();

  const getFullCoinsList = useCallback(async () => {
    try {
      const fetchedCoinsList = await fetchFullCoinsList();

      setFullCoinsList(fetchedCoinsList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getFullCoinsList();
  }, [getFullCoinsList]);

  const matchCoinSymbol = useCallback(
    (matchedSymbol: string): string | never => {
      if (fullCoinsList) {
        const coinObject = fullCoinsList.filter(
          ({ symbol }) => symbol === matchedSymbol
        );

        return coinObject?.[0].id;
      }

      throw Error('fullCoinsList is empty');
    },
    [fullCoinsList]
  );

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

  const onSearchCalculate = useCallback(async () => {
    const [searchPromptAmount, fromSearchSymbol, inText, intoSearchSymbol] =
      searchPrompt.split(' ');

    const searchAmount = Number(searchPromptAmount);
    let calculationResult: number;

    try {
      const matchedSymbolFrom = matchCoinSymbol(fromSearchSymbol);
      const matchedSymbolInto = matchCoinSymbol(intoSearchSymbol);

      if (intoSearchSymbol === 'usd') {
        const usdCoinPrice = (await getCurrencyPrice(matchedSymbolFrom)) ?? 0;
        calculationResult = searchAmount * usdCoinPrice;
      } else {
        const [fromSearchCurrencyPrice, intoSearchCurrencyPrice] =
          await Promise.all([
            getCurrencyPrice(matchedSymbolFrom),
            getCurrencyPrice(matchedSymbolInto),
          ]);

        calculationResult =
          searchAmount * (fromSearchCurrencyPrice! / intoSearchCurrencyPrice!);
      }

      setSearchResult(parseFloat(calculationResult.toFixed(2)));
    } catch (error) {
      console.error(error);
    }
  }, [searchPrompt, matchCoinSymbol, getCurrencyPrice]);

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
