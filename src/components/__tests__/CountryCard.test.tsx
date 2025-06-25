import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../CountryCard";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

const country = {
  cca2: "IN",
  flags: { svg: "flag.svg" },
  name: { common: "India" },
  population: 1000000,
  region: "Asia",
  capital: ["Delhi"],
};

describe("CountryCard", () => {
  it("renders country info and toggles favorite", () => {
    render(
      <FavoritesProvider>
        <CountryCard country={country} />
      </FavoritesProvider>
    );
    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText("Population: 1000000")).toBeInTheDocument();
    expect(screen.getByText("Region: Asia")).toBeInTheDocument();
    expect(screen.getByText("Capital: Delhi")).toBeInTheDocument();

    const favButton = screen.getByRole("button");
    expect(favButton).toHaveTextContent("☆");
    fireEvent.click(favButton);
    expect(favButton).toHaveTextContent("★");
  });
});
