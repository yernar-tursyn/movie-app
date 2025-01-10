import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Movie App
              </Typography>
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/favorites">
                Favorites
              </Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ py: 4 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

