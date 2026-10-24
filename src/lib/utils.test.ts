import { describe, it, expect } from "vitest";
import { formatMonth } from "./utils";

describe("formatMonth", () => {
  it("formats month in English", () => {
    expect(formatMonth("2023-05", "en")).toBe("May 2023");
  });

  it("formats month in Indonesian", () => {
    expect(formatMonth("2023-05", "id")).toContain("Mei");
  });
});
