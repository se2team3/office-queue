import React, { useState, useEffect } from 'react';
import { Button, Row, Alert, Col } from "react-bootstrap";
import API from '../api/API';

function CounterScreen(props) {

    const [lastCustomer, setLastCustomer] = useState(null);
    const [counter, setCounter] = useState(null);

    useEffect(()=>{
        API.getCounter(props.counter_id)
            .then((c)=>{
                setCounter(c);
            })
    },[]);

    function onCallNext(){
        API.callNextCustomer(props.counter_id)
            .then((obj)=>setLastCustomer(obj))
    }

    return (
        <Col className="justify-content-md-center" style={{textAlign: "center"}}>
            <h1>{`Counter ${props.counter_id}`}</h1>
            <p>
    This counter is currently serving the following operations: {counter&&counter.operations.map((o)=> <><br/><b>{o.name}</b></>)}
            </p>
            <br/>
            <Row className="justify-content-md-center">
                <Col xs="auto">
                    {lastCustomer&&("code" in lastCustomer)&&<Alert variant="success">Called customer {lastCustomer.code} {lastCustomer.number}</Alert>}
                    {lastCustomer&&(!("code" in lastCustomer))&&<Alert variant="warning">No customer found in line right now, try later</Alert>}
                </Col>
            </Row>
            <Button variant="success" onClick={onCallNext}>Call next customer</Button>
        </Col>
        
    )

}

export default CounterScreen;