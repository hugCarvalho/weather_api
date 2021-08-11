import React from "react";
import { render, screen, container } from "@testing-library/react";
import SavedCitiesMenu from "./SavedCitiesMenu";
import App from "../../App";

test("1st render and no saved cities should render correctly ", () => {
  render(
    <App>
      <SavedCitiesMenu />
    </App>
  );

  const citiesBtn = screen.queryAllByRole("button", { name: /empty/i });
  const saveBtn = document.body.querySelectorAll(".radio-btns");
  expect(citiesBtn).toHaveLength(3);
  expect(saveBtn.length).toBe(3);
});
