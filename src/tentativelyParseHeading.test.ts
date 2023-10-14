import { describe, it, expect, vi } from "vitest";
import { ParseHeadingChildNode } from "./parseHeadingChildNode";
import {
  TentativelyParseHeading,
  makeTentativelyParseHeading,
} from "./tentativelyParseHeading";
import { loadMarkdownFromFixture } from "./testHelpers/loadMarkdownFromFixture";
import { mockFnThatShouldntBeCalled } from "./testHelpers/mockFnThatShouldntBeCalled";

type SetupParams = {
  parseHeadingChildNode: ParseHeadingChildNode;
  startIndex: number;
};

const setup = async ({ parseHeadingChildNode, startIndex }: SetupParams) => {
  const markdown = await loadMarkdownFromFixture("tentativelyParseHeading");

  const tentativelyParseHeading = makeTentativelyParseHeading({
    parseHeadingChildNode,
  });

  const result = tentativelyParseHeading(markdown, startIndex);

  return {
    result,
  };
};

describe("When parsing a heading", () => {
  const secondSetup = setup;

  type TestParams = {
    setup: () => Promise<{
      result: ReturnType<TentativelyParseHeading>;
    }>;
    expectedResult: {
      status: "Success";
      node: {
        type: "heading";
        depth: number;
        children: any[];
      };
      newIndex: number;
    };
  };

  const test = async ({ setup, expectedResult }: TestParams) => {
    it("Succeeds in parsing and returns the parsed node and new index", async () => {
      const { result } = await setup();

      expect(result).toEqual(expectedResult);
    });
  };

  describe("When parsing a h1 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h1 Heading",
        },
        newIndex: 13,
      });

      return secondSetup({
        startIndex: 1,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 1,
          children: [
            {
              type: "text",
              content: "h1 Heading",
            },
          ],
        },
        newIndex: 13,
      },
    });
  });

  describe("When parsing a h2 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h2 Heading",
        },
        newIndex: 28,
      });

      return secondSetup({
        startIndex: 15,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 2,
          children: [
            {
              type: "text",
              content: "h2 Heading",
            },
          ],
        },
        newIndex: 28,
      },
    });
  });

  describe("When parsing a h3 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h3 Heading",
        },
        newIndex: 44,
      });

      return secondSetup({
        startIndex: 30,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 3,
          children: [
            {
              type: "text",
              content: "h3 Heading",
            },
          ],
        },
        newIndex: 44,
      },
    });
  });

  describe("When parsing a h4 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h4 Heading",
        },
        newIndex: 61,
      });

      return secondSetup({
        startIndex: 46,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 4,
          children: [
            {
              type: "text",
              content: "h4 Heading",
            },
          ],
        },
        newIndex: 61,
      },
    });
  });

  describe("When parsing a h5 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h5 Heading",
        },
        newIndex: 79,
      });

      return secondSetup({
        startIndex: 63,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 5,
          children: [
            {
              type: "text",
              content: "h5 Heading",
            },
          ],
        },
        newIndex: 79,
      },
    });
  });

  describe("When parsing a h6 heading", () => {
    const thirdSetup = () => {
      const parseHeadingChildNode = vi.fn().mockReturnValue({
        status: "Success" as const,
        node: {
          type: "text",
          content: "h6 Heading",
        },
        newIndex: 98,
      });

      return secondSetup({
        startIndex: 81,
        parseHeadingChildNode,
      });
    };

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Success",
        node: {
          type: "heading",
          depth: 6,
          children: [
            {
              type: "text",
              content: "h6 Heading",
            },
          ],
        },
        newIndex: 98,
      },
    });
  });
});

describe("When parsing a line that starts with a hash sequence but doesn't have a space right after it", () => {
  type SecondSetupParams = {
    startIndex: number;
  };

  const secondSetup = ({ startIndex }: SecondSetupParams) => {
    const parseHeadingChildNode = mockFnThatShouldntBeCalled;

    return setup({
      startIndex,
      parseHeadingChildNode,
    });
  };

  type TestParams = {
    expectedResult: {
      status: "Fail";
      content: string;
      newIndex: number;
    };
    setup: () => Promise<{
      result: ReturnType<TentativelyParseHeading>;
    }>;
  };

  const test = ({ expectedResult, setup }: TestParams) => {
    it("Fails in parsing and returns the new index and the read content", async () => {
      const { result } = await setup();

      expect(result).toEqual(expectedResult);
    });
  };

  describe("And the hash sequence is of length 1", () => {
    const thirdSetup = () => secondSetup({ startIndex: 100 });

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Fail",
        content: "#",
        newIndex: 100,
      },
    });
  });

  describe("And the hash sequence is of length 4", () => {
    const thirdSetup = () => secondSetup({ startIndex: 135 });

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Fail",
        content: "####",
        newIndex: 138,
      },
    });
  });

  describe("And the hash sequence is of length > 6", () => {
    const thirdSetup = () => secondSetup({ startIndex: 173 });

    test({
      setup: thirdSetup,
      expectedResult: {
        status: "Fail",
        content: "######",
        newIndex: 178,
      },
    });
  });
});
