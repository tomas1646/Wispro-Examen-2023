import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import SnackbarComponent from './components/SnackBar';
import InternetPlansList from './internetPlans/InternetPlans';
import ManagePlansList from './internetPlans/ManagePlansList';
import { useSessionUser } from './store/userStore';
import Login from './user/Login';
import Register from './user/Register';
import { getOptions } from './utils/utils';

function App() {
  const user = useSessionUser();

  return (
    <>
      <AppContainer title='Wispro - Examen' navigation={getOptions()}>
        <Routes>
          {/*<Route
            path='/board'
            element={user ? <BoardHome /> : <Navigate to={'/'} />}
          />
          <Route
            path='/board/:token'
            element={user ? <ShowBoard /> : <Navigate to={'/'} />}
  />*/}
          <Route
            path='/internet_plans'
            element={user ? <InternetPlansList /> : <Navigate to={'/'} />}
          />
          <Route
            path='/manage_plans'
            element={user ? <ManagePlansList /> : <Navigate to={'/'} />}
          />

          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </AppContainer>
      <SnackbarComponent />
    </>
  );
}

export default App;
