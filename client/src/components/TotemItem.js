import React from 'react';
import { Button, Col, Card } from "react-bootstrap";

const TotemItem = (props) => {

    let { op, onGetNumberPressed } = props;


    return <Col xs="12" sm="6" md="4" lg="3">
        <Card>
            <Card.Body>
                <Card.Title>{op.name}</Card.Title>
                <Card.Text>{op.description}</Card.Text>
                <Button variant="primary" onClick={()=>onGetNumberPressed(op.code)}>Get number</Button>
            </Card.Body>
        </Card>
    </Col>
}

export default TotemItem;