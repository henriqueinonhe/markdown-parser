import { readFile } from "node:fs/promises";

export const loadMarkdownFromFixture = async (fixtureName: string) => {
  const markdown = await readFile(
    `./src/fixtures/${fixtureName}TestMarkdown.md`,
    "utf-8",
  );

  return markdown;
};
