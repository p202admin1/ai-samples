import { Box, Typography } from '@mui/material';

export default function Interstitial({text}: any) {
  return (
    <Box>
      <Typography>{text}</Typography>
    </Box>
  );
}