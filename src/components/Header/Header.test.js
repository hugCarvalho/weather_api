import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

test("should render title and subtitle", () => {
  const { getByRole, getByText } = render(<Header />);
  getByRole("heading", { name: /weatherjetzt/i });
  getByText(/get your weather everywhere\. or almost\.\.\./i);
});
