"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import BetterChatWindow from "../components/BetterChatWindow";

export default function BasicChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic Chat" />
        <BetterChatWindow />
      </Box>
  );
}