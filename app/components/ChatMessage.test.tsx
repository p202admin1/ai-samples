import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatMessage from "./ChatMessage";


describe("ChatMessage", () => {
  it("renders a user message", () => {
    const message = {text: "hello", source: "You"};
    render(<ChatMessage message={message} />);
 
    const helloNode = screen.getByText("hello");
    const youNode = screen.queryByText("You");
 
    expect(helloNode).toBeInTheDocument();
    expect(youNode).toBeInTheDocument();
  });

  it("renders a bot message", () => {
    const message = {text: "hello mr. anderson", source: "bot"};
    render(<ChatMessage message={message} />);
 
    const helloNode = screen.getByText("hello mr. anderson");
    const youNode = screen.queryByText("You");
    
    expect(helloNode).toBeInTheDocument();
    expect(youNode).toBeNull();
  });
});