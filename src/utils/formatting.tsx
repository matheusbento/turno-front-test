import { Moment } from "moment";

export const formatMoney = (number: number) => number.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
})

export const formatNumber = (number: number) => Number(number).toFixed(2);

export const formatTimeShort = (moment: Moment) =>
  moment.format("h:mm a").slice(0, -1);

export const beautifyJson = (json: string) => {
  const obj = JSON.parse(json);
  return JSON.stringify(obj, undefined, 4);
};
