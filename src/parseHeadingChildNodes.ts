import { ignoreLeadingNonLineBreakWhitespace } from "./ignoreLeadingNonLineBreakWhitespace";
import {
  isLineBreak,
  isNonLineBreakWhitespace,
  isPossiblyEmOnlyStart,
  isPossiblyInlineCodeStart,
  isPossiblyStrongOrEmStart,
} from "./singleCharacterChecks";
import { tentativelyParseEmOnly } from "./tentativelyParseEmOnly";

type Dependencies = {};

export const makeParseHeadingChildNodes =
  ({}: Dependencies) =>
  (markdown: string, index: number) => {
    // Receives index at first non whitespace
    // character

    // TEMP
    const nodes = [] as Array<any>;
    let currentNodeContent = "";

    while (!isLineBreak(markdown[index])) {
      if (isPossiblyEmOnlyStart(markdown[index])) {
        const result = tentativelyParseEmOnly(markdown, index);

        if (result.status === "Success") {
          const textNode = {
            type: "text",
            content: currentNodeContent,
          };

          nodes.push(textNode);
          nodes.push(result.node);

          index = result.newIndex;
          currentNodeContent = "";
          continue;
        }

        currrentNodeContent += result.content;
        index = newIndex;
        continue;
      }

      if (isNonLineBreakWhitespace(markdown[index])) {
        // Collapse whitespace
        // We have to check whether we actually want to convert
        // tabs to plain spaces
        currentNodeContent += " ";
        index++;

        ignoreLeadingNonLineBreakWhitespace(markdown, index);
        continue;
      }

      currentNodeContent += markdown[index];
      index++;
    }

    return {
      nodes,
      newIndex: index,
    };
  };

const reachedEndOfNode = (character: string) => {
  return (
    isLineBreak(character) ||
    isPossiblyStrongOrEmStart(character) ||
    isPossiblyEmOnlyStart(character) ||
    isPossiblyInlineCodeStart(character)
  );
};

export type ParseHeadingChildNodes = ReturnType<
  typeof makeParseHeadingChildNodes
>;
