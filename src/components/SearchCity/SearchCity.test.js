import React from "react";
import { render, screen } from "@testing-library/react";
import SearchCity from "./SearchCity";
import App from "../../App";

test("should render city searchbox and a go button ", () => {
  const Wrapper = ({ children }) => <App>{children}</App>;
  render(<SearchCity />, { wrapper: Wrapper });

  screen.getByPlaceholderText(/city name/i);
  screen.getByRole("heading", { name: /search for a city/i });
  screen.getByRole("button", { name: /go/i });
});
