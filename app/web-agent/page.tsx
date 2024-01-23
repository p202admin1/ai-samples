"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import ChatUI from "../components/ChatUI";
import { webAgentUrl } from '../http/urls';

export default function WebAgentPage() {
  return (
      <Box>
        <Heading variant="h1" text="Chat With Web Agent" />
        <ChatUI url={webAgentUrl} />
      </Box>
  );
}