import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import SnackbarComponent from './components/SnackBar';
import Login from './user/Login';
import Register from './user/Register';
import { getOptions } from './utils/utils';

function App() {
  return (
    <>
      <AppContainer title='Wispro - Examen' navigation={getOptions()}>
        <Routes>
          {/*
          <Route
            path='/board'
            element={user ? <BoardHome /> : <Navigate to={'/'} />}
          />
          <Route
            path='/board/:token'
            element={user ? <ShowBoard /> : <Navigate to={'/'} />}
          />
          <Route
            path='/profile'
            element={user ? <Profile /> : <Navigate to={'/'} />}
          />
          */}

          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </AppContainer>
      <SnackbarComponent />
    </>
  );
}

export default App;
