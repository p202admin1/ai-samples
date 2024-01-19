"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import BasicChat from "./BasicChat";

export default function BasicChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic Chat" />
        <BasicChat />
      </Box>
  );
}