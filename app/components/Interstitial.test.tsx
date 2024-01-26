import "@testing-library/jest-dom"
import { render } from "@testing-library/react";
import Interstitial from "./Interstitial";

test("renders Interstitial component", () => {
  const mockText = "Example Text";
  const { getByText } = render(<Interstitial text={mockText} />);
  const textElement = getByText(mockText);
  expect(textElement).toBeInTheDocument();
});