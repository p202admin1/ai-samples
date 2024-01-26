import React from "react";
import "@testing-library/jest-dom"
import { render } from "@testing-library/react";
import Heading from "./Heading";

test("renders heading component correctly", () => {
  const text = "Hello World";
  const variant = "h1";
  const { getByText } = render(<Heading text={text} variant={variant} />);
  const headingElement = getByText(text);
  expect(headingElement).toBeInTheDocument();
});
