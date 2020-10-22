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
    alert(""+err.status+err.errorObj)
    if (err) {
        if (err.status && err.status === 401) {
            this.setState({authErr: err.errorObj, authUser: null});
            this.props.history.push("/");
        }

        if (err.status && err.status === 404) {
            this.setState({apiError: 404})
            this.props.history.push("/");
        }
    }
  }

  getCounters = () => {       //retrieves the counters list
    API.getCounters()
        .then((counters)=>{
            this.setState({counters: counters});
        })
        .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
  }

  getOperations = () => {     //retrieves all possible operations, it is required to set up counters to set their operations
    API.getOperations()
        .then((operations)=>{
            this.setState({operations: operations});
        })
        .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
  }

  updateCounters = (numberOfCounters) => {    //updates the counters list
    for(let i=0; i < Math.abs(this.state.counters.length-numberOfCounters); i++){
      if(this.state.counters.length<numberOfCounters){
        API.addCounter({id: this.state.counters.length + 1 + i})
          .then(()=>{this.getOperations()
            this.getCounters()})// TODO [MINOR!] call these gets only for the last insertion
          .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
      }
      else if(this.state.counters.length>numberOfCounters){
        API.deleteCounter(this.state.counters.length-i)
          .then(()=>{this.getOperations()
            this.getCounters()})// TODO [MINOR!] call these gets only for the last deletion
          .catch((errorObj) => {
            this.handleErrors(errorObj);
          });
      }
    }
  }

  addOperation = (operation) => {
    API.addOperation(operation).then(
      API.updateCounterOperation(operation.code, operation.counters).then(()=>{
        this.getOperations()
        this.getCounters()
      }
      ).catch((errorObj) => {
        this.handleErrors(errorObj);
      })
    ).catch((errorObj) => {
      this.handleErrors(errorObj);
    });
  }

  editOperation = (operation) => {
    API.updateOperation(operation).then(
      API.updateCounterOperation(operation.code, operation.counters).then(()=>{
        this.getOperations()
        this.getCounters()
      }
      ).catch((errorObj) => {
        this.handleErrors(errorObj);
      })
    ).catch((errorObj) => {
      this.handleErrors(errorObj);
    });
  }

  deleteOperation = (operation) => {
    API.updateCounterOperation(operation.code, []).then(()=>{
      API.deleteOperation(operation.code).then(()=>this.getOperations())
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
    }
    ).catch((errorObj) => {
      this.handleErrors(errorObj);
    })
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* TODO missing navbar in counter screen -->*/}
            <Route path="/counter/:counter_id" render={(props)=>
              <>
                <Navbar bg="primary" variant="dark">
                  <Navbar.Brand href="#home">Office Queue</Navbar.Brand>
                </Navbar>
                <CounterScreen counter_id={props.match.params.counter_id}/>
              </>
            }/>
            
            <Route path="/board">
              <Board></Board>
            </Route>
            <Route path="/settings">
              <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Office Queue</Navbar.Brand>
              </Navbar>
              <SettingsPage
                counters={this.state.counters}
                operations={this.state.operations}
                getCounters={this.getCounters}
                getOperations={this.getOperations}
                updateCounters={this.updateCounters}
                addOperation={this.addOperation}
                editOperation={this.editOperation}
                deleteOperation={this.deleteOperation}
              />
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
