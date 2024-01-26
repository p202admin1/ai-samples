import { render, fireEvent } from "@testing-library/react";
import { ChatButtons } from "./ChatButtons";

describe("ChatButtons", () => {
  test("should call handleSend when send button is clicked", async () => {
    const handleSend = jest.fn();
    const handleClear = jest.fn();

    const { getByText } = render(
      <ChatButtons handleSend={handleSend} handleClear={handleClear} />
    );

    const sendButton = getByText("Send");
    fireEvent.click(sendButton);

    expect(handleSend).toHaveBeenCalled();
    expect(handleClear).not.toHaveBeenCalled();
  });

  test("should call handleClear when clear button is clicked", async () => {
    const handleSend = jest.fn();
    const handleClear = jest.fn();

    const { getByText } = render(
      <ChatButtons handleSend={handleSend} handleClear={handleClear} />
    );

    const clearButton = getByText("Clear");
    fireEvent.click(clearButton);

    expect(handleSend).not.toHaveBeenCalled();
    expect(handleClear).toHaveBeenCalled();
  });
});
