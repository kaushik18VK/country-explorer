import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { AuthProvider } from "../../contexts/AuthContext";

describe("Navbar", () => {
  it("shows Login when not authenticated", () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows Favorites and Logout when authenticated", () => {
    window.localStorage.setItem("user", "testuser");
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    window.localStorage.removeItem("user");
  });
});
