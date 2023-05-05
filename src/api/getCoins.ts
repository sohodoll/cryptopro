const getCoins = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return res.json();
};

export const coinsList = await getCoins();
