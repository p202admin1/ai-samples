import { useState, MouseEvent, ChangeEvent } from "react";
import { AppChatMessage, Chatters } from "../types/Chat";
import { err } from "../logging";

export default function useChat(postMessageFunc: (msg: AppChatMessage) =>  Promise<AppChatMessage>) {
  const [chatError, setChatError] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<AppChatMessage[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleSend = async (e: MouseEvent) => {
    e.preventDefault();
    if (inputValue !== "") {
      try {
        const messageText = inputValue;
        setChatMessages((prevMessages) => [...prevMessages, {message: messageText, source: Chatters.UI}]);
        setInputValue("");
        const receivedMessage = await  postMessageFunc({message: messageText, source: Chatters.UI}); 
        setChatMessages((prevMessages) => [...prevMessages, receivedMessage] as AppChatMessage[]);
      } catch (e) {
        err(`error in chat component ${e}`);
        setChatError(e as unknown as Error);
      }
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    setChatMessages([]);
    setInputValue("");
  };

  return {chatError, inputValue, chatMessages, handleChange, handleClear, handleSend};
}