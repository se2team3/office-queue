import React from 'react';
import { Button, Row, Alert, Col } from "react-bootstrap";
import API from '../api/API';

var demoOperations = [
    {code: "Y", name: "Yoga", description: "Yoga sessions outdoor and indoor", counters: [1, 2, 3, 4, 8, 12]},
    {code: "P", name: "Payments", description: "Everything concerning money", counters: [1, 2, 4, 5]},
    {code: "S", name: "Services", description: "Services for customer of services", counters: [1, 3, 4, 8, 12]}
]

function CounterScreen(props) {

    var operations = demoOperations

    function onCallNext(){
        console.log(API.callNextCustomer(props.counter_id));
    }

    return (
        <Col className="justify-content-md-center" style={{textAlign: "center"}}>
            <h1>{`Counter ${props.counter_id}`}</h1>
            <p>
    This counter is currently serving the following operations: {operations.map((o)=> <><br/><b>{o.name}</b></>)}
            </p>
            <br/>
            {/*<Alert variant="success">Called customer ...</Alert>
            <Alert variant="warning">No customer in line right now</Alert>*/}
            <Button variant="success" onClick={onCallNext}>Call next customer</Button>
        </Col>
        
    )

}

export default CounterScreen;