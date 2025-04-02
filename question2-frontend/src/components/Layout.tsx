import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'yellow' : 'white',
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
          <Button component={NavLink} to="/" style={navLinkStyle}>
            Top Users
          </Button>
          <Button component={NavLink} to="/trending" style={navLinkStyle}>
            Trending Posts
          </Button>
          <Button component={NavLink} to="/feed" style={navLinkStyle}>
            Feed
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
         <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
                {/* Footer Content */}
                Analytics Dashboard © {new Date().getFullYear()}
            </Typography>
         </Container>
      </Box>
    </Box>
  );
};

export default Layout;