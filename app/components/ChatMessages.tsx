import {Box, List, ListItem, ListItemText} from "@mui/material";
import { AppChatMessage } from '../types/Chat';

interface ChatMessagesProps {
  messages: AppChatMessage[]
}

const listStyle: any = {
    height: '450px',
    border: "1px solid #e0e0e0",
    width: "80%",
    padding: "10px 0",
    margin: "10px auto",
    "overflowY": "scroll",
};

export function ChatMessages({messages}: ChatMessagesProps) {
  
  const messagesMarkup = messages.map(({text, source}, i) => {
    return <ListItem key={i}><ListItemText><b>{source}:</b> {text}</ListItemText></ListItem>
  });
  return (
    <Box>
      <div id="chat-window" style={listStyle}>
        {messagesMarkup}
      </div>
    </Box>
  );
}
