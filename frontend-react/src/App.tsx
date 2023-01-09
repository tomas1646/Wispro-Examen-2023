import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import SnackbarComponent from './components/SnackBar';
import InternetPlansList from './internetPlans/InternetPlansList';
import ManagePlansList from './internetPlans/ManagePlansList';
import ManageRequestsList from './planRequests/ManageRequestsList';
import PlanModification from './planRequests/PlanModification';
import PlanRequestsList from './planRequests/PlanRequestsList';
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
          <Route
            path='/plan-modification/:id'
            element={user ? <PlanModification /> : <Navigate to={'/'} />}
          />
          <Route
            path='/manage-requests'
            element={user ? <ManageRequestsList /> : <Navigate to={'/'} />}
          />
          <Route
            path='/my-requests'
            element={user ? <PlanRequestsList /> : <Navigate to={'/'} />}
          />
          <Route
            path='/internet-plans'
            element={user ? <InternetPlansList /> : <Navigate to={'/'} />}
          />
          <Route
            path='/manage-plans'
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
