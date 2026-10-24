import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewSwitcher } from "./view-switcher";

describe("ViewSwitcher", () => {
  beforeEach(() => {
    document.documentElement.dataset.view = "recruiter";
    window.history.replaceState(null, "", "/");
  });

  it("renders two radios, clicking Engineer sets dataset.view, aria-checked, and ?view=engineer", async () => {
    render(
      <ViewSwitcher
        label="View as"
        hint="The page rewrites itself"
        names={{ recruiter: "Recruiter", engineer: "Engineer" }}
      />
    );

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);

    const recruiterBtn = screen.getByRole("radio", { name: "Recruiter" });
    const engineerBtn = screen.getByRole("radio", { name: "Engineer" });

    expect(recruiterBtn).toHaveAttribute("aria-checked", "true");
    expect(engineerBtn).toHaveAttribute("aria-checked", "false");

    await userEvent.click(engineerBtn);

    expect(document.documentElement.dataset.view).toBe("engineer");
    expect(engineerBtn).toHaveAttribute("aria-checked", "true");
    expect(recruiterBtn).toHaveAttribute("aria-checked", "false");
    expect(window.location.search).toContain("view=engineer");
  });

  it("ArrowRight toggles view", () => {
    render(
      <ViewSwitcher
        label="View as"
        hint="The page rewrites itself"
        names={{ recruiter: "Recruiter", engineer: "Engineer" }}
      />
    );

    const radiogroup = screen.getByRole("radiogroup");
    const engineerBtn = screen.getByRole("radio", { name: "Engineer" });

    fireEvent.keyDown(radiogroup, { key: "ArrowRight" });

    expect(document.documentElement.dataset.view).toBe("engineer");
    expect(engineerBtn).toHaveAttribute("aria-checked", "true");
    expect(window.location.search).toContain("view=engineer");
  });
});
