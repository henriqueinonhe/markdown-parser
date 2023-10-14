import { isNonLineBreakWhitespace } from "./singleCharacterChecks";

export const ignoreLeadingNonLineBreakWhitespace = (
  markdown: string,
  index: number,
) => {
  while (isNonLineBreakWhitespace(markdown[index])) {
    index++;
  }

  return index;
};
