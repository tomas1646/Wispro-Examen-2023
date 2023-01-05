import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SpeedIcon from '@mui/icons-material/Speed';

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  content: T;
}

enum Roles {
  Isp = 'Isp',
  Client = 'Client',
}

export interface SideBarMenu {
  path: string;
  name: string;
  icon: JSX.Element;
  showAlways?: boolean;
  roles?: Array<Roles>;
}

export const getOptions = (): SideBarMenu[] => {
  return [
    { path: '', name: 'Login', icon: <LoginIcon /> },
    {
      path: 'register',
      icon: <AccountCircleIcon />,
      name: 'Register',
    },
    {
      path: 'internet_plans',
      name: 'Internet Plans',
      icon: <NetworkCheckIcon />,
      roles: [Roles.Client, Roles.Isp],
    },
    {
      path: 'manage_plans',
      name: 'Manage Plans',
      icon: <SpeedIcon />,
      roles: [Roles.Isp],
    },
  ];
};
