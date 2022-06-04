import test from "ava";
import { addMinutes, getUnixTime } from "date-fns";
import { isCodeExpired } from ".";

test("Future date", (t) => {
  const twentyMinFromNow = addMinutes(new Date(), 20);
  const seconds = getUnixTime(twentyMinFromNow);
  const isExpiredFuture: boolean = isCodeExpired(seconds);

  t.is(isExpiredFuture, false);
});

test("Past date", (t) => {
  const seconds = new Date().getSeconds() / 1000;

  const isExpiredPast: boolean = isCodeExpired(seconds);
  t.is(isExpiredPast, true);
});
