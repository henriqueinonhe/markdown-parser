import { isWhitespace } from "./singleCharacterChecks";

export const ignoreLeadingWhitespace = (markdown: string, index: number) => {
  while (isWhitespace(markdown[index])) {
    index++;
  }

  return index;
};
