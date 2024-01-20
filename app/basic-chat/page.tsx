"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import MainChat from '../components/MainChat';
import { basicUrl } from '../http/urls';

export default function BasicChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Basic Chat" />
        <MainChat url={basicUrl} />
      </Box>
  );
}