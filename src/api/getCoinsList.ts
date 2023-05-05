const getCoinsList = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/list', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return res.json();
};

export const fullCoinsList = await getCoinsList();
