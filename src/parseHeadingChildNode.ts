export type ParseHeadingChildNode = (
  markdown: string,
  index: number,
) => {
  node: any;
  newIndex: number;
};
