import "@testing-library/jest-dom"
import { render } from "@testing-library/react";
import ChatError from "./ChatError";

describe("ChatError", () => {
  it("renders the error message", () => {
    const error = new Error("Something went wrong");
    const { getByText } = render(<ChatError error={error} />);
    const errorMessage = getByText(`A failure is you: ${error.message}`);
    expect(errorMessage).toBeInTheDocument();
  });
});