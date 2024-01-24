"use client"
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import WebSearchForm from './WebSearchForm';

export default function BasicChatPage() {
  return (
      <Box>
        <Heading variant="h1" text="Interwebs Search Agent" />
        <WebSearchForm />
      </Box>
  );
}
