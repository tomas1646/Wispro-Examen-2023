import {
  AppBar,
  Chip,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { SideBarMenu } from '../utils/utils';
import { cleanupSessionUser, useSessionUser } from '../store/userStore';
import { Box } from '@mui/system';
import { SubTitle } from './Title';

interface Props {
  title: string;
  children: JSX.Element[] | JSX.Element;
  navigation?: SideBarMenu[];
}

export default function AppContainer(props: Props) {
  const drawerWidth = 180;
  const navigation = useNavigate();
  const user = useSessionUser();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          {user && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <AccountCircleIcon fontSize='large' />
              <SubTitle text={user.name} />
              <Chip label={user.type} color='secondary' />
            </div>
          )}
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
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          {props.navigation &&
            props.navigation.map((item) => {
              if (
                item.showAlways ||
                (item.roles &&
                  item.roles.some((role) => role === user?.type)) ||
                (!user && !item.roles)
              ) {
                return (
                  <ListItem disablePadding key={item.name}>
                    <Link
                      to={'/' + item.path}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        width: '100%',
                      }}
                    >
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              } else {
                return null;
              }
            })}

          {user && (
            <ListItem
              key={'Logout'}
              disablePadding
              onClick={() => {
                cleanupSessionUser();
                navigation('/');
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Container maxWidth='lg' sx={{ flexGrow: 1, p: 9 }}>
        {props.children}
      </Container>
    </Box>
  );
}
