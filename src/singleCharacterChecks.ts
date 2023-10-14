export const isWhitespace = (character: string) => {
  // Include CRLF
  return character === " " || character === "\n" || character === "\t";
};

export const isNonLineBreakWhitespace = (character: string) => {
  return character === " " || character === "\t";
};

export const isLineBreak = (character: string) => {
  // Include CRLF
  return character === "\n";
};

export const isPossiblyHeadingStart = (character: string) => {
  return character === "#";
};

export const isPossiblyUnorderedListOrHorizontalRuleStart = (
  character: string,
) => {
  return character === "-";
};

export const isPossiblyOrderedListStart = (character: string) => {
  return character === "1";
};

export const isQuoteStart = (character: string) => {
  return character === ">";
};

export const isPossiblyCodeBlockStart = (character: string) => {
  return character === "`";
};

export const isPossiblyImageStart = (character: string) => {
  return character === "!";
};

export const isPossiblyCommentStart = (character: string) => {
  return character === "<";
};

export const isPossiblyStrongOrEmStart = (character: string) => {
  return character === "*";
};

export const isPossiblyEmOnlyStart = (character: string) => {
  return character === "_";
};

export const isPossiblyInlineCodeStart = (character: string) => {
  return character === "`";
};
