import {Typography} from '@mui/material';

export interface HeadingProps {
  text: string;
  variant: any;
}

export default function Heading({text, variant}: HeadingProps) {
  return (
    <Typography 
      variant={variant}
      style={{fontWeight: 100, fontSize: "2.4em", margin: "0.4em 0"}}>{text}</Typography>
  );
}