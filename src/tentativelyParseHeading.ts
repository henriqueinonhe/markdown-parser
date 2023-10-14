import { ignoreLeadingNonLineBreakWhitespace } from "./ignoreLeadingNonLineBreakWhitespace";
import { ParseHeadingChildNodes } from "./parseHeadingChildNodes";
import { isNonLineBreakWhitespace } from "./singleCharacterChecks";

type Dependencies = {
  parseHeadingChildNodes: ParseHeadingChildNodes;
};

export const makeTentativelyParseHeading =
  ({ parseHeadingChildNodes }: Dependencies) =>
  (markdown: string, index: number) => {
    // Receives index at the SECOND character
    // of the posible heading, after the first hash

    // If we got here it means that we've already
    // read the first hash
    let content = "#";
    let depth = 1;

    while (markdown[index] === "#" && depth < 6) {
      // We store hashes here because
      // we still don't know whether this is a heading
      // or not, and in the case this isn't
      // we don't want to have to read them again
      content += markdown[index];
      index++;
      depth++;
    }

    if (!isNonLineBreakWhitespace(markdown[index])) {
      return {
        status: "Fail" as const,
        content,
        newIndex: index,
      };
    }

    // Moving to next character past the whitespace
    index++;
    index = ignoreLeadingNonLineBreakWhitespace(markdown, index);

    const { nodes, newIndex } = parseHeadingChildNodes(markdown, index);

    return {
      status: "Success" as const,
      node: {
        type: "heading",
        depth,
        children: nodes,
      },
      newIndex,
    };
  };

export type TentativelyParseHeading = ReturnType<
  typeof makeTentativelyParseHeading
>;
