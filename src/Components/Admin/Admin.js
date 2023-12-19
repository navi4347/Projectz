import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Empinfo from './EMPinfo';
import Clients from './Clients';
import Content from './Content';
import Sellerinfo from './sellerinfo';
import Dashboard from './Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import {Box, Typography, CssBaseline, AppBar as MuiAppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, InputBase, Badge,} from '@mui/material';
import {Menu as MenuIcon,Search as SearchIcon, AccountCircle,Mail as MailIcon,Notifications as NotificationsIcon, MoreVert as MoreIcon,  Business as BusinessIcon,ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,Dashboard as DashboardIcon,} from '@mui/icons-material';
import './App.css';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [selectedContent, setSelectedContent] = React.useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleListItemClick = (text) => setSelectedContent(text);

  const handleProfileMenuOpen = () => {
    // Handle profile menu opening
  };

  const handleMobileMenuOpen = () => {
    // Handle mobile menu opening
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>         
          <Typography variant="h4" sx={{ my: 2 }}>
            PROJECT
          </Typography>
          <IconButton onClick={handleDrawerClose} style={{ fontSize: '2rem' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {['Dashboard','Sellerinfo', 'Clients', 'Empinfo', 'Help', 'Settings', 'Logout'].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleListItemClick(text)}
                selected={text === selectedContent}
                sx={{ marginBottom: 2 }}
              >
                <ListItemButton>
                  <ListItemIcon>                   
                    {text === 'Dashboard' && <DashboardIcon sx={{ color: 'white' }} />}
                    {text === 'Sellerinfo' && <ViewInArIcon sx={{ color: 'white' }} />}
                    {text === 'Clients' && <BusinessIcon sx={{ color: 'white' }} />}
                    {text === 'Empinfo' && <SwitchAccountIcon sx={{ color: 'white' }} />}
                    {text === 'Help' && <HelpCenterIcon sx={{ color: 'white' }} />}
                    {text === 'Settings' && <SettingsIcon sx={{ color: 'white' }} />}
                    {text === 'Logout' && <LogoutIcon sx={{ color: 'white' }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {selectedContent === 'Dashboard' && <Dashboard />}
        {selectedContent === 'Sellerinfo' && <Sellerinfo />}
        {selectedContent === 'Empinfo' && <Empinfo />}
        {selectedContent === 'Clients' && <Clients />}
      </Main>

      {selectedContent === null && <Content />}
    </Box>
  );
}
