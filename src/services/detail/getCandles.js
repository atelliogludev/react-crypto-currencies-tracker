import { apiCurrencyCandles } from "..";

export default async function getCandles(id, interval, startDate, endDate) {
  console.log(apiCurrencyCandles(id, interval, startDate, endDate));
  return await fetch(apiCurrencyCandles(id, interval, startDate, endDate))
    .then((response) => response.json())
    .then((bulkData) => {
      return bulkData.data.map((item) => {
        return {
          x: new Date(item.period),
          y: [
            parseFloat(item.open),
            parseFloat(item.high),
            parseFloat(item.low),
            parseFloat(item.close),
          ],
        };
      });
    });
}
