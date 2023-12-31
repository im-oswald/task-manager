import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import 'App.css';
import { Alert, Landing, Navbar } from 'components/layout';
import { Login, Register } from 'components/auth';
import { Dashboard } from 'components/dashboard';
import { PrivateRoute } from 'components/routing';
import { setAuthToken } from 'utils';
import { loadUser } from 'actions';
import { Tasks } from 'components/tasks';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

/**
 * App
 */
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route exact path='/tasks' element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            } />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
