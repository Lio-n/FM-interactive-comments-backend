import test from "ava";
import getRandomNum from ".";

test("Check random num", (t) => {
  const rand1 = getRandomNum();
  const rand2 = getRandomNum();

  t.true(typeof rand1 === "number");
  t.true(typeof rand2 === "number");

  t.not(rand1, rand2);
});
