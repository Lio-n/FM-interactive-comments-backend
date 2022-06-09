import * as gen from "random-seed";

const random = gen.create();

const getRandomNum = (): number => random.intBetween(10000, 99999);

export default getRandomNum;
