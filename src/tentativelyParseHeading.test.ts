import { ParseHeadingChildNode } from "./parseHeadingChildNode";
import { makeTentativelyParseHeading } from "./tentativelyParseHeading";

type SetupParams = {
  parseHeadingChildNode: ParseHeadingChildNode;
};

const setup = async ({ parseHeadingChildNode }: SetupParams) => {
  const tentativelyParseHeading = makeTentativelyParseHeading({
    parseHeadingChildNode,
  });

  const result = tentativelyParseHeading("# Hello world", 0);
};
