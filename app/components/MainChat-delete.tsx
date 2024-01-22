"use client"
import React from "react";
import { Box, Paper } from "@mui/material";
import useChat from '../hooks/useChat';
import { ChatMessages } from "../components/ChatMessages";
import { ChatButtons } from "../components/ChatButtons";
import ChatError from "../components/ChatError";
import { postMessage } from '../http/postMessage';
import { chatControlsTempStyles } from '../constants/tempStyles';
import ChatInput from '../components/ChatInput';

interface MainChatProps {
  url: string;
}

export default function MainChat({url}: MainChatProps) {
  const {inputValue, chatError, chatMessages, handleChange, handleClear, handleSend} = useChat(
    url,
    postMessage
  );
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(e as unknown as React.MouseEvent<Element, MouseEvent>);
    }
  };
  return (
    <Box>
      <ChatMessages messages={chatMessages} />
      <Paper sx={chatControlsTempStyles}>
        <ChatInput handleChange={handleChange} handleEnter={handleEnter} value={inputValue} />
        <ChatButtons handleClear={handleClear} handleSend={handleSend} />
      </Paper>
      {chatError !== null && <ChatError error={chatError} />}
    </Box>
  )
}