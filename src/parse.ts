type Dependencies = {
  // TEMP
  parseNode: (
    markdown: string,
    index: number,
  ) => {
    // TEMP
    node: any;
    newIndex: number;
  };
};

// TODO Define return type
export const makeParse =
  ({ parseNode }: Dependencies) =>
  (markdown: string) => {
    // Move this down

    // TEMP
    const children = [] as Array<any>;
    let index = 0;

    while (index < markdown.length) {
      const { node, newIndex } = parseNode(markdown, index);

      children.push(node);
      index = newIndex;
    }

    const document = {
      type: "document",
      children,
    };

    return document;
  };
