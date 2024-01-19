import {Alert} from "@mui/material/"

interface ChatErrorProps {
  error: Error;
}

export default function ChatError({error}: ChatErrorProps) {
  return (
    <>
      <Alert severity="error">A failure is you: {error.message}</Alert>
    </>
  );
}