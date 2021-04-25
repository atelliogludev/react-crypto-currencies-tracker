import { apiExchangeRates } from ".."

export default async function getCurrencies() {
    return await fetch(apiExchangeRates())
    .then(response => response.json())
    .then(bulk => bulk.data);
}