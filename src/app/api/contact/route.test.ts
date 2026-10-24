import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

const mockSend = vi.fn();

vi.mock("resend", () => {
  return {
    Resend: class {
      emails = {
        send: mockSend,
      };
    },
  };
});

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.RESEND_API_KEY = "test_key";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";
  });

  it("returns 400 on invalid body", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "bad", message: "short" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 and does not send if honeypot is filled", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot",
        email: "bot@example.com",
        message: "This is a spam message that is long enough.",
        company: "SpamCorp",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 503 if env vars are missing", async () => {
    delete process.env.RESEND_API_KEY;

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "User",
        email: "user@example.com",
        message: "This is a legitimate message with sufficient length.",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toBe("not_configured");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 200 and calls send with replyTo on valid body", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "123" }, error: null });

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "User",
        email: "user@example.com",
        message: "This is a legitimate message with sufficient length.",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: "user@example.com",
        subject: "Portfolio message from User",
        text: "This is a legitimate message with sufficient length.",
      })
    );
  });
});
