import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import 'App.css';
import { Landing } from 'components/layout';
import { Login, Register } from 'components/auth';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={<h1>Dashboard</h1>} />
        </Routes>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
