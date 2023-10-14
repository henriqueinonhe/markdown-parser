import { describe, it, expect, vi } from "vitest";
import { makeParseNode } from "./parseNode";
import { makeTentativelyParseHeading } from "./tentativelyParseHeading";
import { ParseParagraph } from "./parseParagraph";
import { loadMarkdownFromFixture } from "./testHelpers/loadMarkdownFromFixture";
import { ParseHeadingChildNode } from "./parseHeadingChildNode";
import { mockFnThatShouldntBeCalled } from "./testHelpers/mockFnThatShouldntBeCalled";

type SetupParams = {
  startingIndex: number;
  parseHeadingChildNode: ParseHeadingChildNode;
  parseParagraph: ParseParagraph;
};

const setup = async ({
  startingIndex,
  parseHeadingChildNode,
  parseParagraph,
}: SetupParams) => {
  const markdown = await loadMarkdownFromFixture("parseNode");

  const tentativelyParseHeading = makeTentativelyParseHeading({
    parseHeadingChildNode,
  });

  const parseNode = makeParseNode({
    tentativelyParseHeading,
    parseParagraph,
  });

  const result = parseNode(markdown, startingIndex);

  return { result };
};

type TestParams = {
  expectedNode: any;
  expectedNewIndex: number;
  setup: () => Promise<{
    result: { node: any; newIndex: number };
  }>;
};

const test = ({ expectedNewIndex, expectedNode, setup }: TestParams) => {
  it("Returns node and new index", async () => {
    const { result } = await setup();

    expect(result.node).toEqual(expectedNode);
    expect(result.newIndex).toEqual(expectedNewIndex);
  });
};

describe("When parsing a heading", () => {
  const secondSetup = () => {
    const startingIndex = 0;
    const parseHeadingChildNode = vi.fn().mockReturnValueOnce({
      node: { type: "text", content: "h1 Heading " },
      newIndex: 20,
    });
    const parseParagraph = vi.fn();

    return setup({
      parseParagraph,
      parseHeadingChildNode,
      startingIndex,
    });
  };

  test({
    expectedNewIndex: 20,
    expectedNode: {
      type: "heading",
      depth: 1,
      children: [{ type: "text", content: "h1 Heading " }],
    },
    setup: secondSetup,
  });
});

describe("When parsing something that looks like a heading but it's not", () => {
  const secondSetup = () => {
    const startingIndex = 106;
    const parseHeadingChildNode = mockFnThatShouldntBeCalled;
    const parseParagraph = vi.fn().mockReturnValue({
      node: {
        type: "paragraph",
        children: [
          { type: "text", content: "#Looks like a heading but it's not" },
        ],
      },
      newIndex: 141,
    });

    return setup({
      parseParagraph,
      parseHeadingChildNode,
      startingIndex,
    });
  };

  test({
    expectedNewIndex: 141,
    expectedNode: {
      type: "paragraph",
      children: [
        { type: "text", content: "#Looks like a heading but it's not" },
      ],
    },
    setup: secondSetup,
  });
});

describe("When parsing a paragraph that looks like a paragraph from the very beginning", () => {
  const secondSetup = () => {
    const startingIndex = 142;
    const parseHeadingChildNode = mockFnThatShouldntBeCalled;
    const parseParagraph = vi.fn().mockReturnValue({
      node: {
        type: "paragraph",
        children: [{ type: "text", content: "Some paragraph" }],
      },
      newIndex: 156,
    });

    return setup({
      parseParagraph,
      startingIndex,
      parseHeadingChildNode,
    });
  };

  test({
    expectedNewIndex: 156,
    expectedNode: {
      type: "paragraph",
      children: [{ type: "text", content: "Some paragraph" }],
    },
    setup: secondSetup,
  });
});
