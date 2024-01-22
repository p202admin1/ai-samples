import { Box, Avatar, Paper, Typography } from '@mui/material';
import { AppChatMessage, Chatters } from '../types/Chat';

interface ChatMessageProps {
  message: AppChatMessage
}

const appPurple = "#9575cd";

export default function ChatMessage({ message }: ChatMessageProps) {
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