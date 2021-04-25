export const baseUrl = "https://api.coincap.io/v2/";
export const apiExchangeRates = () => `${baseUrl}assets`;
export const apiCurrencyCandles = (id, interval, startDate, endDate) =>
  `${baseUrl}candles?exchange=binance&interval=${interval}&baseId=${id}&quoteId=tether&start=${startDate}&end=${endDate}`;

export const apiRateDetail = (id) => `${baseUrl}assets/${id}`