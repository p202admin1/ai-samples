"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import ChatUI from '../components/ChatUI';
import connectWithAgent from "../web-agent/connectWithAgent";
import { webNotAgentUrl } from '../http/urls';

const AgentConnectedChatButNot = connectWithAgent(ChatUI, webNotAgentUrl);

export default function WebNotAgentPage() {
  return (
      <Box>
        <Heading variant="h1" text="Interwebs Search Agent" />
        <AgentConnectedChatButNot />
      </Box>
  );
}
