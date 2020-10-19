import React from 'react';
// import assets
import './assets/App.css';
// import API
import API from "./API";
import Board from "./components/Board"
import CounterScreen from "./components/CounterScreen"
import SettingsPage from "./components/SettingsPage"
import TotemPage from "./components/TotemPage"
import {Navbar} from "react-bootstrap"
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

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/counter/:counter_id" component={CounterScreen}/>
          
          <Route path="/board">
            <Board getBoardList={API.getBoardList}></Board>
          </Route>
          <Route path="/settings">
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">Office Queue</Navbar.Brand>
            </Navbar>
            <SettingsPage/>
          </Route>
          <Route>
          <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">Office Queue</Navbar.Brand>
            </Navbar>
            <TotemPage/>
          </Route>
        </Switch>
      </Router>
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
