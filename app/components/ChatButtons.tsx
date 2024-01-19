import { MouseEvent } from "react";
import {Button} from "@mui/material";

interface ChatButtonsProps {
  handleSend: (e: MouseEvent) => Promise<void>;
  handleClear: (e: MouseEvent) => void;
}

export function ChatButtons({handleClear, handleSend}: ChatButtonsProps) {
  return (
    <div style={{display: "flex"}}>
        <div style={{flex: 1, textAlign: "center"}}>
          <Button variant="contained" color="success" onClick={handleSend}>Send</Button>
        </div>
        <div style={{flex: 1, textAlign: "center"}}>
          <Button variant="contained" color="error" onClick={handleClear}>Clear</Button>
        </div>
      </div>
  );
}