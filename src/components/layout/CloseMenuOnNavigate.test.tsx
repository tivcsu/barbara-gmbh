import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/src/i18n/navigation", () => ({
  usePathname: () => "/",
}));

import { CloseMenuOnNavigate } from "./CloseMenuOnNavigate";

describe("CloseMenuOnNavigate", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("closes nested menus when a link is activated", () => {
    render(
      <details open data-testid="outer-menu">
        <summary>Menu</summary>
        <CloseMenuOnNavigate>
          <details open data-testid="inner-menu">
            <summary>Services</summary>
            <a href="#services">All services</a>
          </details>
        </CloseMenuOnNavigate>
      </details>,
    );

    fireEvent.click(screen.getByRole("link", { name: "All services" }));

    expect(screen.getByTestId("inner-menu")).not.toHaveAttribute("open");
    expect(screen.getByTestId("outer-menu")).not.toHaveAttribute("open");
  });

  it("closes a mobile menu after selecting a language button", () => {
    render(
      <details open data-testid="menu">
        <summary>Menu</summary>
        <CloseMenuOnNavigate>
          <button type="button">English</button>
        </CloseMenuOnNavigate>
      </details>,
    );

    fireEvent.click(screen.getByRole("button", { name: "English" }));

    expect(screen.getByTestId("menu")).not.toHaveAttribute("open");
    expect(window.sessionStorage.getItem("barbara-menu-scroll-top")).toBe(
      "true",
    );
  });

  it("closes an open services menu when clicking outside it", () => {
    render(
      <>
        <CloseMenuOnNavigate>
          <details open data-testid="services-menu">
            <summary>Services</summary>
            <a href="#office-cleaning">Office cleaning</a>
          </details>
        </CloseMenuOnNavigate>
        <button type="button">Outside</button>
      </>,
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));

    expect(screen.getByTestId("services-menu")).not.toHaveAttribute("open");
  });

  it("scrolls an already active menu route to the top", () => {
    render(
      <details open>
        <summary>Menu</summary>
        <CloseMenuOnNavigate>
          <a href={window.location.href} onClick={(event) => event.preventDefault()}>
            Home
          </a>
        </CloseMenuOnNavigate>
      </details>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Home" }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });
});
