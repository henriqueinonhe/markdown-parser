import { vi } from "vitest";

export const mockFnThatShouldntBeCalled = vi.fn().mockImplementation(() => {
  throw new Error("Should not have been called!");
});
