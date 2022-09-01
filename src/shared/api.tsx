const BASE_URL = `https://api.coinpaprika.com/v1`;
const CHART_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((resp) => resp.json());
};

export const fetchCoinInfo = async (id: string | undefined) => {
  return await (await fetch(`${BASE_URL}/coins/${id}`)).json();
};

export const fetchCoinPrice = async (id: string | undefined) => {
  return await (await fetch(`${BASE_URL}/tickers/${id}`)).json();
};

export const fetchCoinChart = async (id: string) => {
  return await (await fetch(`${CHART_URL}?coinId=${id}`)).json();
};
