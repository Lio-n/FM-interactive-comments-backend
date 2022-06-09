import { isArray, isEmpty } from "lodash";

const isAValidArray = (arr: Array<any>) => {
  if (isArray(arr) && !isEmpty(arr)) return true;
  return;
};

export { isAValidArray };
