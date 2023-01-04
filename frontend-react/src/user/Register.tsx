import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonPanel from '../components/ButtonPanel';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import FormTextField from '../components/TextField';
import { Title } from '../components/Title';
import { register } from './userService';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !name || !email || !type) {
      return showErrorMessage('Inputs cant be empty');
    }

    register(username, password, name, email, type)
      .then((response) => {
        showSuccessMessage(response.message);
        navigate('/login');
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || 'Unexcpected Error')
      );
  };

  const resetFields = () => {
    setName('');
    setPassword('');
    setUsername('');
  };

  return (
    <>
      <Title text='Create User' />
      <form onSubmit={(e) => handleRegister(e)}>
        <FormTextField
          label='Full Name'
          name='name'
          title='Enter Full Name'
          value={name}
          setValue={setName}
        />
        <FormTextField
          label='Email'
          name='email'
          title='Enter Email'
          value={email}
          setValue={setEmail}
        />
        <FormTextField
          label='User'
          name='user'
          title='Enter Username'
          value={username}
          setValue={setUsername}
        />
        <FormTextField
          label='Password'
          name='password'
          title='Enter Password'
          value={password}
          setValue={setPassword}
          password
        />
        <ToggleButtonGroup
          color='primary'
          value={type}
          exclusive
          onChange={(e, data) => setType(data)}
          aria-label='Platform'
        >
          <ToggleButton value='Client'>Client</ToggleButton>
          <ToggleButton value='Isp'>ISP</ToggleButton>
        </ToggleButtonGroup>
        <ButtonPanel
          button={[
            { onClick: resetFields, text: 'Clear Fields' },
            { submit: true, text: 'Register' },
          ]}
        />
        <input type='submit' hidden />
      </form>
    </>
  );
}
