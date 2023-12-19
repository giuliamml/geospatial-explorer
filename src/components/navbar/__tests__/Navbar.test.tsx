import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("<NavbarComp />", () => {
  it("should render the navbar with links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const exploreLink = screen.getByRole("link", { name: "Explore" });
    expect(exploreLink).toBeInTheDocument();
    expect(exploreLink).toHaveAttribute("href", "/");

    const analyticsLink = screen.getByRole("link", { name: "Analytics" });
    expect(analyticsLink).toBeInTheDocument();
    expect(analyticsLink).toHaveAttribute("href", "/analytics");
  });
});
