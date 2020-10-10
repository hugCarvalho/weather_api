import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputSearchCity from "./InputSearchCity";
import App from "../../App";

test("should render city searchbox and a go button ", () => {
  let res;
  const handleSubmit = (text) => (res = text);
  const Wrapper = ({ children }) => <App>{children}</App>;
  render(<InputSearchCity />, { wrapper: Wrapper });
  // render(
  //   <App onSubmit={handleSubmit}>
  //     <InputSearchCity />
  //   </App>
  // );

  screen.getByPlaceholderText(/city name/i);
  screen.getByRole("heading", { name: /search for a city/i });
  screen.getByRole("button", { name: /go/i });
});
