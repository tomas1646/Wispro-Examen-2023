import {
  AppBar,
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
import { Link, useNavigate } from 'react-router-dom';
import { SideBarMenu } from '../utils/utils';
import { cleanupSessionUser, useSessionUser } from '../store/userStore';
import { Box } from '@mui/system';

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
          {user && <Typography>{user.name}</Typography>}
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
                (user && item.loggedUserOnly) ||
                (!user && !item.loggedUserOnly)
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
