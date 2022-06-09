import { addMinutes, fromUnixTime, isAfter } from "date-fns";

const getExpirationDate = (): Date => addMinutes(new Date(), 20);

const isCodeExpired = (expiresDate: number): boolean => {
  const isExpired = isAfter(new Date(), expiresDate);
  if (isExpired) return true;
  return false;
};

export { getExpirationDate, isCodeExpired };
