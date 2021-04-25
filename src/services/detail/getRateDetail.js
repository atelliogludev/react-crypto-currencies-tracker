import { apiRateDetail } from "..";

export default async function getRateDetail(id) {
  return await fetch(apiRateDetail(id))
    .then((response) => response.json())
    .then((bulkData) => bulkData.data)
}