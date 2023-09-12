import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<h1>Welcome to the React App</h1>} />                                                                         
        </Routes>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
