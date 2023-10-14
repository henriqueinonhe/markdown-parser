export type ParseParagraph = (
  markdown: string,
  index: number,
  alreadyReadContent?: string,
) => {
  node: any;
  newIndex: number;
};
