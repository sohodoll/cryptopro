export const getCoinCoefficient = async (coinId: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );
  return res.json();
};
