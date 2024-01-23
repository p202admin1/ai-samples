import * as React from "react";
import {Box, TextField, Button, Grid} from "@mui/material";
import useChat from '../hooks/useChat';
import { postMessage } from '../http/postMessage';
import ChatMessage from './ChatMessage';

interface ChatUIProps {
  url: string;
  userName?: string;
  selectedSite?: any;
}

export default function ChatUI(props: ChatUIProps) {
  const {inputValue, chatError, chatMessages, handleChange, handleSend} = useChat(
    {...props},
    postMessage
  );
  
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {chatMessages.map((item, i) => <ChatMessage key={i} message={item} />)}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Ask Away"
              variant="outlined"
              value={inputValue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="success"
              variant="contained"
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
