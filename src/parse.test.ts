import { describe, it, expect, vi } from "vitest";
import { makeParse } from "./parse";
import ast from "./fixtures/parseTestAst";
import { readFile } from "fs/promises";
import { loadMarkdownFromFixture } from "./testHelpers/loadMarkdownFromFixture";

describe("Generic test", () => {
  const setup = async () => {
    const parseNode = vi
      .fn()
      .mockReturnValueOnce({
        node: ast.children[0],
        newIndex: 26,
      })
      .mockReturnValueOnce({
        node: ast.children[1],
        newIndex: 33,
      });

    const parse = makeParse({
      parseNode,
    });

    const markdown = await loadMarkdownFromFixture("parse");

    const result = parse(markdown);

    return {
      result,
      ast,
    };
  };

  it("Parses correctly", async () => {
    const { result, ast } = await setup();

    expect(result).toEqual(ast);
  });
});
