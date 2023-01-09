import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonPanel } from '../components/ButtonPanel';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import { FormTextField } from '../components/TextField';
import { Title } from '../components/Title';
import { login } from './userService';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      return showErrorMessage('Inputs cant be empty');
    }

    login(username, password)
      .then((response) => {
        showSuccessMessage(response.message);
        navigate('/internet-plans');
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || 'Unexcpected Error')
      );
  };

  const resetFields = () => {
    setPassword('');
    setUsername('');
  };

  return (
    <>
      <Title text='Login' />
      <form onSubmit={(e) => handleLogin(e)}>
        <FormTextField
          label='UserName'
          name='username'
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
        <ButtonPanel
          button={[
            { onClick: resetFields, text: 'Clear Fields' },
            { submit: true, text: 'Login' },
          ]}
        />
        <input type='submit' hidden />
      </form>
    </>
  );
}
