import React from 'react';
// import assets
import './assets/App.css';
import logo from './assets/logo.svg';
// import API
import API from "./API";
import Board from "./components/registerForm/Board"
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { render } from 'react-dom';
// import React Routes
/*
import LoginPage from "routes/LoginPage";
import RegisterPage from "routes/RegisterPage";
 */
// import components
/*
  import PrivateRoute from "components/PrivateRoute";
*/
// import context
/* if ever needed
*   import userContext from "utils/userContext";
*/
// import react-routers
/*
    import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
*/

function App() {
  return (
    <div className="App"><Board></Board>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
  
  
}

/*
* <Router>
    <Switch>
        <Route path='/login' render={(props) => (
            <LoginPage onLogin={this.handleLogin} {...props}/>
        )}/>
     </Switch>
   </Router>
* */


export default App;
