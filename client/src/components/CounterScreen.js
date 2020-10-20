import React from 'react';
import { Button, Row, Alert, Col } from "react-bootstrap";
import API from '../api/API';

class CounterScreen extends React.Component {

    //TODO dynamically bind counter information
    constructor(props){
        super();
        this.state = {counterId: props.match.params.counter_id, currentTicket: {}};
    }

    /* componentDidMount(){
        API.getCounter(this.state.counterId)
        .then((counter)=> this.setState({counter: counter}))
        .catch((err)=>{
            // HANDLE ERROR
        });
    } */

    onCallNextCustomer= () =>{
        API.callNextCustomer(this.state.currentTicket)
            .then((nextTicket) => this.setState({currentTicket: nextTicket}))
            .catch((err)=>{
                // TODO handle error
            });
    }

    render() {
        return (
            <Col className="justify-content-md-center">
                <h1>{`Counter ${this.state.counterId}`}</h1>
                <p>
                    This counter is currently serving the following operations: Payments, Accounts, Banking
                    Related, Yoga
                </p>
                <Row className="justify-content-md-center">
                        <Alert variant="warning" dismissible={true}>
                            <b>There are 42 customers in line!</b> For the operation offered by this counter!
                        </Alert>
                </Row>
                <br></br>
                <Button variant="success" onClick={this.onCallNextCustomer}>{`Call next customer ${this.state.currentTicket.id}`}</Button>
            </Col>
            
        )
    }



}

export default CounterScreen;