import React from "react";
import { render, screen } from "@testing-library/react";
import InputSearchCity from "./InputSearchCity";
import App from "../../App";

test("should render city searchbox and a go button ", () => {
  const Wrapper = ({ children }) => <App>{children}</App>;
  render(<InputSearchCity />, { wrapper: Wrapper });

  screen.getByPlaceholderText(/city name/i);
  screen.getByRole("heading", { name: /search for a city/i });
  screen.getByRole("button", { name: /go/i });
});
