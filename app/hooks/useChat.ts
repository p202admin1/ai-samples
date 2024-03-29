import { useState, MouseEvent, ChangeEvent } from "react";
import { AgentUIConfig, AppChatMessage, Chatters } from "../types/Chat";
import { err } from "../logging";

export default function useChat(
  config: {url: string} & AgentUIConfig,
  postMessageFunc: (url: string, msg: AppChatMessage) =>  Promise<AppChatMessage>,
) {
  const {url, ...rest} = config;
  const [chatError, setChatError] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<AppChatMessage[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleSend = async (e: MouseEvent) => {
    e.preventDefault();
    if (inputValue !== "") {
      try {
        const messageText = inputValue;
        setChatMessages((prevMessages) => [...prevMessages, {text: messageText, source: Chatters.UI}]);
        setInputValue("");
        const receivedMessage = await  postMessageFunc(url, {text: messageText, source: Chatters.UI, ...rest}); 
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