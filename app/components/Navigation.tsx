import Link from 'next/link';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { NavigationProps, NavigationLink } from '../types/Navigation';

export default function Navigation({links}: NavigationProps) {
  return (
    <AppBar position='static'>
      <Container >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
              {links.map((link: NavigationLink) => <LinkWrapper key={link.href} {...link} />)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const linkSx = {
  mr: 2,
  display: 'flex',
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: '#fff',
  textDecoration: 'none',
}

export function LinkWrapper({href, text}: NavigationLink) {
  return (
      <Typography sx={linkSx}>
        <Link href={href}>{text}</Link>
      </Typography>
  );
}