import { describe, it, expect, vi } from "vitest";
import { makeParseNode } from "./parseNode";
import { TentativelyParseHeading } from "./tentativelyParseHeading";
import { ParseParagraph } from "./parseParagraph";
import { loadMarkdownFromFixture } from "./testHelpers/loadMarkdownFromFixture";

type SetupParams = {
  startingIndex: number;
  tentativelyParseHeading: TentativelyParseHeading;
  parseParagraph: ParseParagraph;
};

const setup = async ({
  startingIndex,
  parseParagraph,
  tentativelyParseHeading,
}: SetupParams) => {
  const markdown = await loadMarkdownFromFixture("parseNode");

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
  it("Returns heading node and new index", async () => {
    const { result } = await setup();

    expect(result.node).toEqual(expectedNode);
    expect(result.newIndex).toEqual(expectedNewIndex);
  });
};

describe("When parsing a heading", () => {
  const secondSetup = () => {
    const startingIndex = 0;
    const tentativelyParseHeading = vi.fn().mockReturnValue({
      status: "Success",
      node: {
        type: "heading",
        depth: 1,
        children: [{ type: "text", content: "h1 Heading " }],
      },
      newIndex: 20,
    });
    const parseParagraph = vi.fn();

    return setup({
      parseParagraph,
      tentativelyParseHeading,
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
    const tentativelyParseHeading = vi.fn().mockReturnValue({
      status: "Fail",
      content: "#",
      newIndex: 107,
    });
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
      tentativelyParseHeading,
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
  const secontSetup = () => {
    const startingIndex = 142;
    const tentativelyParseHeading = vi.fn().mockImplementation(() => {
      throw new Error("Should not be called!");
    });
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
      tentativelyParseHeading,
    });
  };

  test({
    expectedNewIndex: 156,
    expectedNode: {
      type: "paragraph",
      children: [{ type: "text", content: "Some paragraph" }],
    },
    setup: secontSetup,
  });
});
