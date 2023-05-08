import { ICoin } from 'interfaces';
import { getFullCoinsList as fetchFullCoinsList } from 'api/getFullCoinsList';
import { useCallback, useEffect, useState } from 'react';

export const useGetMatchedCoinSymbol = () => {
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

        return coinObject?.[0]?.id;
      }

      throw Error('fullCoinsList is empty');
    },
    [fullCoinsList]
  );

  return {
    matchCoinSymbol,
  };
};
