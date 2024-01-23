"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import ChatUI from "../components/ChatUI";
import connectWithAgent from './connectWithAgent';

const AgentConnectedChat = connectWithAgent(ChatUI);

export default function WebAgentPage() {
  return (
      <Box>
        <Heading variant="h1" text="Chat With Web Agent" />
          <AgentConnectedChat />
      </Box>
  );
}
