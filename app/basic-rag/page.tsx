"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import MainChat from '../components/MainChat';
import { basicRagUrl } from '../http/urls';

export default function BasicRagChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic RAG Chat" />
        <MainChat url={basicRagUrl} />
      </Box>
  );
}