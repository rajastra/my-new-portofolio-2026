import { describe, it, expect } from "vitest";
import { contactSchema } from "./contact-schema";

describe("contactSchema", () => {
  it("passes for valid input", () => {
    const valid = {
      name: "Raja",
      email: "raja@example.com",
      message: "Hello Raja, this is a message with more than twenty characters.",
    };
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("fails for short message", () => {
    const invalid = {
      name: "Raja",
      email: "raja@example.com",
      message: "Too short",
    };
    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("errorMessage");
    }
  });

  it("fails for bad email", () => {
    const invalid = {
      name: "Raja",
      email: "not-an-email",
      message: "Hello Raja, this is a message with more than twenty characters.",
    };
    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("errorEmail");
    }
  });

  it("fails for empty name", () => {
    const invalid = {
      name: "   ",
      email: "raja@example.com",
      message: "Hello Raja, this is a message with more than twenty characters.",
    };
    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("errorName");
    }
  });
});
