"use client"
import React from "react";
import { Box, Paper, TextField } from "@mui/material";
import { AppChatMessage } from "../types/Chat";
import useChat from '../hooks/useChat';
import { ChatMessages } from "../components/ChatMessages";
import { ChatButtons } from "../components/ChatButtons";
import makeFetchRequest, { createRequest } from "../http/makeFetchRequest";
import { Methods } from "../types/Http";
import ChatError from "../components/ChatError";
import { err } from "../logging";

const basicChatUrl = "http://localhost:3000/api/basic-rag";
const chatControlsTempStyles = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  padding: "1em",
  textAlign: "center"
};


async function postMessage(msg: AppChatMessage): Promise<AppChatMessage> {
  try {
    const response = await makeFetchRequest(createRequest(basicChatUrl, Methods.POST, msg));
    return response;
  } catch (e) {
    err(e);
    throw e;
  }
}

export default function BasicRAGChat() {
  const {inputValue, chatError, chatMessages, handleChange, handleClear, handleSend} = useChat(postMessage);
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };
  return (
    <Box>
      <ChatMessages messages={chatMessages} />
      <Paper sx={chatControlsTempStyles}>
      <TextField
       fullWidth
       type="text"
       value={inputValue}
       sx={{width: "80%", margin: "1em auto"}}
       onChange={handleChange}
       onKeyDown={handleEnter}
      />
      <ChatButtons handleClear={handleClear} handleSend={handleSend} />
      </Paper>
      {chatError !== null && <ChatError error={chatError} />}
    </Box>
  )
}

