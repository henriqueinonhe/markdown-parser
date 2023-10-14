import { ParseHeadingChildNode } from "./parseHeadingChildNode";
import { isLineBreak, isNonLineBreakWhitespace } from "./singleCharacterChecks";

type Dependencies = {
  parseHeadingChildNode: ParseHeadingChildNode;
};

export const makeTentativelyParseHeading =
  ({ parseHeadingChildNode }: Dependencies) =>
  (markdown: string, index: number) => {
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

    const children = [];

    while (!isLineBreak(markdown[index])) {
      const { node, newIndex } = parseHeadingChildNode(markdown, index);

      children.push(node);
      index = newIndex;
    }

    return {
      status: "Success" as const,
      node: {
        type: "heading",
        depth,
        children,
      },
      newIndex: index,
    };
  };

export type TentativelyParseHeading = ReturnType<
  typeof makeTentativelyParseHeading
>;
