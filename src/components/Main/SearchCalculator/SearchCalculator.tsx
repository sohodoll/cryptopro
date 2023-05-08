import bg from 'assets/images/bitcoin-bg.png';
import { useCallback, useState } from 'react';
import { useGetCurrencyPrice } from '../useGetCurrencyPrice';
import { useGetMatchedCoinSymbol } from './useGetMatchedCoinSymbol';
import { ErrorPage } from '../ErrorPage';

export const SearchCalculator = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [searchResult, setSearchResult] = useState<string | number>(0);

  const { getCurrencyPrice, calculate } = useGetCurrencyPrice();
  const { matchCoinSymbol } = useGetMatchedCoinSymbol();

  const onSearchCalculate = useCallback(async () => {
    const [searchPromptAmount, fromSearchSymbol, inText, intoSearchSymbol] =
      searchPrompt.split(' ');

    const searchAmount = Number(searchPromptAmount);
    let calculationResult: number;

    try {
      const matchedSymbolFrom = matchCoinSymbol(fromSearchSymbol);
      const matchedSymbolInto = matchCoinSymbol(intoSearchSymbol);

      if (intoSearchSymbol.toLocaleLowerCase() === 'usd') {
        const usdCoinPrice = (await getCurrencyPrice(matchedSymbolFrom)) ?? 0;
        calculationResult = parseFloat(
          (searchAmount * usdCoinPrice).toFixed(2)
        );
      } else {
        calculationResult = await calculate({
          fromCurrency: matchedSymbolFrom,
          intoCurrency: matchedSymbolInto,
          amount: searchAmount,
        });
      }

      setSearchResult(
        calculationResult || 'Wrong input. Check out the readme file.'
      );
    } catch (error) {
      setSearchResult('Too many requests. Come back later.');
    }
  }, [searchPrompt, matchCoinSymbol, getCurrencyPrice, calculate]);

  return (
    <div className="flex items-center justify-center gap-8 md:flex-col">
      <img className="w-80" src={bg} alt="bg" />
      <div className="flex flex-col items-center gap-12">
        <div className="font-bold text-3xl">Use the search prompt</div>
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
              className="text-xl flex items-center h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
              onClick={onSearchCalculate}
            >
              Calculate
            </button>
          </div>
          <div
            id="search-result"
            className="text-xl font-bold flex gap-5 items-center justify-center mt-6"
          >
            <div>Result:</div>
            <span>{searchResult}</span>
          </div>
        </form>
      </div>
    </div>
  );
};
