# Cryptopro: a simple crypto calculator

## Basic info

- Cryptopro is a simple crypto calculator base on the [CoinGecko](https://www.coingecko.com/en/api/documentation) APIs.
- This Free API allows **no more than ~10-20** requests per minute, so please do not spam your requests or you will see the '429' Error in your console.
- If something does not work, you most likely exceeded the number of requests per minute.
- Please wait around **3-5 minutes** in case of sending too many requests and reload the app.
- You can try the search prompt calculation or check out the trending coins and convert one into another.
- Deploy link: https://cryptopros.netlify.app/
- Development branch: https://github.com/sohodoll/cryptopro/tree/develop

## Using the search prompt

- The search prompt allows you to convert a cryptocurrency into **USD** or another cryptocurrency, based on the symbols (BTC, USDT, ETH, etc). For instance, try these prompts: _2 btc in usd_, _10 btc in usdt_, _2 btc in eth_.
- Check out various cryptocurrency symbols you can use [here](https://www.coingecko.com/).
- The search calculator depends on the prompt, so check if you are writing everything correctly.

## Using the trending coins calculator

- Using this tools is pretty straightforward: enter the amount, choose the _from_ and _in_ currencies, and see the result.

## Tech Stack

TS, React, Vite, Tailwind, PostCSS.
