"use client"
import { Box, Button, TextField } from "@mui/material";
import Heading from "../components/Heading";
import BasicRagChat from "./BasicRagChat";

export default function BasicRagChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic RAG Chat" />
        <BasicRagChat />
      </Box>
  );
}