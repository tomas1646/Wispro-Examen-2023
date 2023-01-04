import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  content: T;
}

export interface SideBarMenu {
  path: string;
  name: string;
  icon: JSX.Element;
  loggedUserOnly?: boolean;
  showAlways?: boolean;
}

export const getOptions = (): SideBarMenu[] => {
  return [
    { path: '', name: 'Login', icon: <LoginIcon /> },
    {
      path: 'register',
      icon: <AccountCircleIcon />,
      name: 'Register',
    },
  ];
};
