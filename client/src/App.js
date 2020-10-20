import React from 'react';
// import assets
import './assets/App.css';
// import API
import API from "./api/API";
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



class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {counters: [], operations: []}
  }

  handleErrors(err) {
    alert(err)
    if (err) {
        if (err.status && err.status === 401) {
            this.setState({authErr: err.errorObj, authUser: null});
            this.props.history.push("/login");
        }

        if (err.status && err.status === 404) {
            this.setState({apiError: 404})
            this.props.history.push("/");
        }
    }
  }

  getCounters = () => {
    API.getCounters()
        .then((counters)=>{
            this.setState({counters: counters});
        })
        .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
  }

  getOperations = () => {
    API.getOperations()
        .then((operations)=>{
            this.setState({operations: operations});
        })
        .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/counter/:counter_id" component={CounterScreen}/>
            
            <Route path="/board">
              <Board getLastCustomers={API.getLastCustomers}></Board>
            </Route>
            <Route path="/settings">
              <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Office Queue</Navbar.Brand>
              </Navbar>
              <SettingsPage counters={this.state.counters} operations={this.state.operations} getCounters={this.getCounters} getOperations={this.getOperations} />
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
