import { ignoreLeadingNonLineBreakWhitespace } from "./ignoreLeadingNonLineBreakWhitespace";
import { ignoreLeadingWhitespace } from "./ignoreLeadingWhitespace";
import { ParseParagraph } from "./parseParagraph";
import {
  isPossiblyHeadingStart,
  isPossiblyOrderedListStart,
  isPossiblyUnorderedListOrHorizontalRuleStart,
} from "./singleCharacterChecks";
import { TentativelyParseHeading } from "./tentativelyParseHeading";

type Dependencies = {
  tentativelyParseHeading: TentativelyParseHeading;
  parseParagraph: ParseParagraph;
  // tentativelyParseUnorderedList: (
  //   markdown: string,
  //   index: number,
  // ) =>
  //   | {
  //       status: "Success";
  //       node: any;
  //       newIndex: number;
  //     }
  //   | {
  //       status: "Fail";
  //       content: string;
  //       newIndex: number;
  //     };
  // tentativelyParseOrderedList: (
  //   markdown: string,
  //   index: number,
  // ) =>
  //   | {
  //       status: "Success";
  //       node: any;
  //       newIndex: number;
  //     }
  //   | {
  //       status: "Fail";
  //       content: string;
  //       newIndex: number;
  //     };
};

export const makeParseNode =
  ({
    tentativelyParseHeading,
    parseParagraph, // tentativelyParseUnorderedList,
    // tentativelyParseOrderedList,
  }: Dependencies) =>
  (markdown: string, index: number) => {
    let content = "";

    index = ignoreLeadingWhitespace(markdown, index);

    if (isPossiblyHeadingStart(markdown[index])) {
      const result = tentativelyParseHeading(markdown, index);

      if (result.status === "Success") {
        return {
          node: result.node,
          newIndex: result.newIndex,
        };
      }

      content = result.content;
      index = result.newIndex;

      return parseParagraph(markdown, index, content);
    }

    // if (isPossiblyUnorderedListOrHorizontalRuleStart(markdown[index])) {
    //   const result = tentativelyParseUnorderedList(markdown, index);

    //   if (result.status === "Success") {
    //     return {
    //       node: result.node,
    //       newIndex: result.newIndex,
    //     };
    //   }

    //   content = result.content;
    //   index = result.newIndex;

    //   return parseParagraph(markdown, index, content);
    // }

    // if (isPossiblyOrderedListStart(markdown[index])) {
    //   const result = tentativelyParseOrderedList(markdown, index);

    //   if (result.status === "Success") {
    //     return {
    //       node: result.node,
    //       newIndex: result.newIndex,
    //     };
    //   }

    //   content = result.content;
    //   index = result.newIndex;

    //   return parseParagraph(markdown, index, content);
    // }

    // After everything has been tried
    // we fall back to a paragraph

    return parseParagraph(markdown, index);
  };
