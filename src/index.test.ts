import { describe, it, expect } from "vitest";
// import { ignoreLeadingWhitespace } from ".";

it.skip("A");

// describe("ignoreLeadingWhitespace", () => {
//   type SetupParams = {
//     markdown: string;
//     index: number;
//   };

//   const setup = ({ markdown, index }: SetupParams) => {
//     const newIndex = ignoreLeadingWhitespace(markdown, index);

//     return { newIndex };
//   };

//   type TestParams = {
//     markdown: string;
//     index: number;
//     expectedNewIndex: number;
//   };

//   const test = ({ expectedNewIndex, index, markdown }: TestParams) => {
//     it("Returns the index of the first non-whitespace character", () => {
//       const { newIndex } = setup({ markdown, index });

//       expect(newIndex).toBe(expectedNewIndex);
//     });
//   };

//   describe("When there is a single leading space", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: " KLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there is a single leading tab", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: "\tKLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there is a single leading newline", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: "\nKLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there are several different kinds of whitespace interleaved", () => {
//     test({
//       expectedNewIndex: 13,
//       index: 0,
//       markdown: "  \t\n\n\t \t\t \n\n KLSJd KLASDaskjd ",
//     });
//   });
// });

// describe("ignoreLeadingNonLineBreakWhitespace", () => {
//   type SetupParams = {
//     markdown: string;
//     index: number;
//   };

//   const setup = ({ markdown, index }: SetupParams) => {
//     const newIndex = ignoreLeadingWhitespace(markdown, index);

//     return { newIndex };
//   };

//   type TestParams = {
//     markdown: string;
//     index: number;
//     expectedNewIndex: number;
//   };

//   const test = ({ expectedNewIndex, index, markdown }: TestParams) => {
//     it("Returns the index of the first non-whitespace character", () => {
//       const { newIndex } = setup({ markdown, index });

//       expect(newIndex).toBe(expectedNewIndex);
//     });
//   };

//   describe("When there is a single leading space", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: " KLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there is a single leading tab", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: "\tKLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there is a single leading newline", () => {
//     test({
//       expectedNewIndex: 1,
//       index: 0,
//       markdown: "\nKLSJd KLASDaskjd ",
//     });
//   });

//   describe("When there are several different kinds of whitespace interleaved", () => {
//     test({
//       expectedNewIndex: 13,
//       index: 0,
//       markdown: "  \t\n\n\t \t\t \n\n KLSJd KLASDaskjd ",
//     });
//   });
// });
