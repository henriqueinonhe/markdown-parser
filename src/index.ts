import { readFile } from "node:fs/promises";

const main = async () => {
  const markdown = await readFile("./data/on-code.md", "utf-8");

  const ast = parse(markdown);

  // console.log(ast)
};

const parse = (markdown: string) => {
  // Move this down
  const document = {
    type: "document",
    // TEMP
    children: [] as Array<any>,
  };

  // BEGIN

  // TEMP
  const startIndex = ignoreLeadingWhitespace(markdown, 0);
  const endIndex = markdown.length;
  let index = startIndex;

  while (index < endIndex) {
    const { node, newIndex } = parseNode(markdown, index);

    document.children.push(node);
    index = newIndex;
  }

  // END

  return document;
};

const parseNode = (markdown: string, index: number) => {
  let content = "";

  if (isPossibleHeadingStart(markdown[index])) {
    const result = tentativelyParseHeading(markdown, index);

    if (result.status === "Success") {
      return {
        node: result.node,
        newIndex: result.newIndex,
      };
    }

    content = result.content;
    index = result.newIndex;
  }
};

const tentativelyParseHeading = (markdown: string, index: number) => {
  let content = "";
  let depth = 1;

  while (markdown[index] === "#" && depth <= 6) {
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

const parseHeadingChildNode = (markdown: string, index: number) => {
  index = ignoreLeadingNonLineBreakWhitespace(markdown, index);
};

export const ignoreLeadingWhitespace = (markdown: string, index: number) => {
  while (isWhitespace(markdown[index])) {
    index++;
  }

  return index;
};

export const ignoreLeadingNonLineBreakWhitespace = (
  markdown: string,
  index: number,
) => {
  while (isNonLineBreakWhitespace(markdown[index])) {
    index++;
  }

  return index;
};

const isPossibleHeadingStart = (character: string) => {
  return character === "#";
};

const isWhitespace = (character: string) => {
  // Should we consider CRLF here?
  return character === " " || character === "\n" || character === "\t";
};

const isNonLineBreakWhitespace = (character: string) => {
  return character === " " || character === "\t";
};

const isLineBreak = (character: string) => {
  // Should we consider CRLF here?
  return character === "\n";
};

// main();
