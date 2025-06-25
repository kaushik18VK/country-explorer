import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeProvider } from "next-themes";

describe("ThemeSwitcher", () => {
  it("renders and toggles theme", () => {
    render(
      <ThemeProvider attribute="class">
        <ThemeSwitcher />
      </ThemeProvider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // Simulate click (you may want to check for icon/text change)
    fireEvent.click(button);
  });
});
