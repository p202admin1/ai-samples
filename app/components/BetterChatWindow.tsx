import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { AppChatMessage, Chatters } from '../types/Chat';

const appPurple = "#9575cd";
const msgs = [
  { text: "Stole some styles from the internet and these look a ton better than me winging it...", source: "bot" },
  { text: "Do you even UI, bro?", source: Chatters.UI },
];

export default function ChatUI() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [messages, setMessages] = React.useState<AppChatMessage[]>(msgs);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages: AppChatMessage[]) => {
        return prevMessages.concat({text: inputValue, source: Chatters.UI});
      });
      setInputValue("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((item, i) => (
          <Message key={i} message={item} />
        ))}
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
              onChange={handleInputChange}
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

interface MessageProps {
  message: AppChatMessage
}

export function Message({ message }: MessageProps) {
  const isBot = message.source !== Chatters.UI;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar 
          sx={{ bgcolor: isBot ? "primary.main" : appPurple }}
          src={isBot ? "ai.png" : ""}
        >
          {isBot ? "" : "You"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.light" : appPurple,
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};