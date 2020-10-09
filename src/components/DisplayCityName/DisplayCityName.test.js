import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayCityName from "./DisplayCityName";
import "@testing-library/jest-dom/extend-expect";

describe("Display City Name", () => {
  test("initial render with no saved cities renders correctly ", () => {
    const { getByRole } = render(<DisplayCityName validCity="" />);
    const city = getByRole("heading");
    const allHeadings = screen.queryAllByRole("heading");
    expect(city.textContent).toBe("Search for a city");
    expect(allHeadings).toHaveLength(1);
  });

  test("should render the city name in CAPS ", () => {
    const { getByRole } = render(<DisplayCityName validCity="whatever" />);
    const city = getByRole("heading");
    expect(city.textContent).toBe("WHATEVER");
  });
});
