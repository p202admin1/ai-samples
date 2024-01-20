import { TextField } from '@mui/material';

interface ChatInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnter: (e: React.KeyboardEvent) => void;
  value: string;
}

export default function ChatInput({handleChange, handleEnter, value}: ChatInputProps) {
  return (
    <TextField
      fullWidth
      type="text"
      value={value}
      sx={{width: "80%", margin: "1em auto"}}
      onChange={handleChange}
      onKeyDown={handleEnter}
    />
  );
}