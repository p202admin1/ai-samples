"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import ChatUI from "../components/ChatUI";
import {basicUrl} from "../http/urls";

export default function BasicChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic Chat" />
        <ChatUI url={basicUrl} />
      </Box>
  );
}