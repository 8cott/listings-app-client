import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SRCLogoWhite from '../assets/src-logo-white.png';
import SRLogoWhite from '../assets/sr-logo-white.png';
import { toast } from 'react-toastify';

function AppBarMUI() {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // User Menu Handlers
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Login Handler
  const handleLogin = () => {
    navigate('/login');
  };

  // Signup Handler
  const handleSignup = () => {
    navigate('/signup');
  };

  // Create Handler
  const handleCreate = () => {
    navigate('/listings/create');
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    toast('Logged out successfully');
  };

  // Navigation to Home Page
  const navigateToHome = () => {
    navigate('/');
  };

  // Menu Item Click Handler
  const handleMenuClick = (setting) => {
    handleCloseUserMenu();

    // Handle menu item click
    switch (setting) {
      case 'Logout':
        handleLogout();
        break;
      case 'Login':
        handleLogin();
        break;
      case 'Signup':
        handleSignup();
        break;
      case 'Create Listing':
        handleCreate();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar position='fixed' sx={{ backgroundColor: 'black' }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: '5rem',
            '@media (min-width:0px)': { minHeight: '5rem' },
            paddingLeft: '2rem',
            paddingRight: '2rem',
          }}
        >
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '1rem' }}
          >
            <img
              src={SRCLogoWhite}
              alt='Logo'
              style={{ height: '2.5rem', cursor: 'pointer' }}
              onClick={navigateToHome}
            />
          </Box>
          <Box
            sx={{ display: { xs: 'flex', md: 'none' }, marginRight: '1rem' }}
          >
            <img
              src={SRLogoWhite}
              alt='Logo'
              style={{ height: '2.5rem', cursor: 'pointer' }}
              onClick={navigateToHome}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon sx={{ color: 'white', fontSize: '2rem' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '2rem' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(isLoggedIn
                ? ['Create Listing', 'Logout']
                : ['Login', 'Signup']
              ).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuClick(setting)}
                >
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '5.5rem' }}>
      </Box>
    </>
  );
}

export default AppBarMUI;
