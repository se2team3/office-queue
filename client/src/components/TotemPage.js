import React from 'react';
import { Button, Row, Alert, Col, Container, Jumbotron, Card } from "react-bootstrap";

function TotemPage(props) {
    var demoOperations = [
        {code: "Y", name: "Yoga", description: "Yoga sessions outdoor and indoor", counters: [1, 2, 3, 4, 8, 12]},
        {code: "P", name: "Payments", description: "Everything concerning money", counters: [1, 2, 4, 5]},
        {code: "S", name: "Services", description: "Services for customer of services", counters: [1, 3, 4, 8, 12]}
    ]


    return <>
        <Jumbotron>
            <h1>Welcome!</h1>
            <p>
                Click on the button corresponding to the operation you want to perform and wait for your number to be called.
            </p>
        </Jumbotron>
        <Container fluid>
            <Row>
                {demoOperations.map((op)=>{
                    return <Col xs="12" sm="6" md="4" lg="3">
                    <Card>
                        <Card.Body>
                            <Card.Title>{op.name}</Card.Title>
                            <Card.Text>{op.description}</Card.Text>
                            <Button variant="primary">Get number</Button>
                        </Card.Body>
                    </Card>
                </Col>
                })}
            </Row>
        </Container>

    </>
}

export default TotemPage;