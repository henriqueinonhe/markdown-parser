export type TentativelyParseHeading = (
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
