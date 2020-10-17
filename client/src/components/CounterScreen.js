import React from 'react';
import { Button, Row, Alert, Col } from "react-bootstrap";

class CounterScreen extends React.Component {

    //TODO dynamically bind counter information
    render() {
        return (
            <Col className="justify-content-md-center">
                <h1>Counter 7</h1>
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
                <Button variant="success" type="submit">Call next customer</Button>
            </Col>
            
        )
    }



}

export default CounterScreen;