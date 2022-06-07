import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/login.page';
import './index.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { HomePage } from './pages/home.page';
import { Provider } from 'react-redux';
import {store} from './redux/store'

const theme={
  body:{
    button:'lightblue',
    borderRadius:'4px',
    iconHeight:'30px'
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Router>
    <Provider store={store}>
      <Switch>
      <Route path='/home'>
        <HomePage/>
      </Route>
      <Route path='/'>
        <LoginPage/>
      </Route>
      </Switch>
    </Provider>
    </Router>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
