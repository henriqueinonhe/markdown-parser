type Dependencies = {
  isPossiblyHeadingStart: (character: string) => boolean;
  tentativelyParseHeading: (
    markdown: string,
    index: number,
  ) =>
    | {
        status: "Success";
        node: any;
        newIndex: number;
      }
    | {
        status: "Fail";
        content: string;
        newIndex: number;
      };
  parseParagraph: (
    markdown: string,
    index: number,
    alreadyReadContent?: string,
  ) => {
    node: any;
    newIndex: number;
  };
  isPossiblyUnorderedListStart: (character: string) => boolean;
  tentativelyParseUnorderedList: (
    markdown: string,
    index: number,
  ) =>
    | {
        status: "Success";
        node: any;
        newIndex: number;
      }
    | {
        status: "Fail";
        content: string;
        newIndex: number;
      };
  isPossiblyOrderedListStart: (character: string) => boolean;
  tentativelyParseOrderedList: (
    markdown: string,
    index: number,
  ) =>
    | {
        status: "Success";
        node: any;
        newIndex: number;
      }
    | {
        status: "Fail";
        content: string;
        newIndex: number;
      };
};

export const makeParseNode =
  ({
    isPossiblyHeadingStart,
    tentativelyParseHeading,
    parseParagraph,
    isPossiblyUnorderedListStart,
    tentativelyParseUnorderedList,
    isPossiblyOrderedListStart,
    tentativelyParseOrderedList,
  }: Dependencies) =>
  (markdown: string, index: number) => {
    let content = "";

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

    if (isPossiblyUnorderedListStart(markdown[index])) {
      const result = tentativelyParseUnorderedList(markdown, index);

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

    if (isPossiblyOrderedListStart(markdown[index])) {
      const result = tentativelyParseOrderedList(markdown, index);

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
  };
