import React, { useState, useEffect } from "react";
import { Button, Row, Alert, Col, Container, Form, Table } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ModalOperation from './ModalOperation'

var demoOperations = [
    {code: "Y", name: "Yoga", description: "Yoga sessions outdoor and indoor", counters: [1, 2, 3, 4, 8, 12]},
    {code: "P", name: "Payments", description: "Everything concerning money", counters: [1, 2, 4, 5]},
    {code: "S", name: "Services", description: "Services for customer of services", counters: [1, 3, 4, 8, 12]}
]

function SettingsPage(props) {
    
    const [numberOfCounters, setNumberOfCounters] = useState(12); //TODO get from backend
    const [operations, setOperations] = useState(demoOperations); //TODO get from backend

    return <Container style={{textAlign: "left"}}>
        <Row>
            <Col>
                <h1>
                    Settings
                </h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Counters</h2>
            </Col>
        </Row>
        <Row>
            
            <Col>
                <Form.Group>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>How many counter are there in the office?</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of counters" value={numberOfCounters} onChange={(ev)=>setNumberOfCounters(ev.target.value)} />
                    </Form.Group>
                    </Form.Row>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Operations</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <OperationsSettings operations={operations} availableCounters={Array.from(Array(numberOfCounters).keys()).map((n)=>{return {label: n.toString(), id: n}})} />
            </Col>
        </Row>
    </Container>
}

function OperationsSettings(props){
    
    const [modalOperationShow, setModalOperationShow] = useState(false);
    const [modalOperation, setModalOperation] = useState(null);

    return <>
        {props.operations.length>0&&<Table striped bordered hover>
            <thead>
                <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Counters</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.operations.map((operation)=>{
                    return <OperationSettingsRow operation={operation} editOperation={()=>{setModalOperation(operation); setModalOperationShow(true)}}/>
                })}
            </tbody>
        </Table>}
        {props.operations.length==0&&<p>No operation has been defined for now, click on the green button below to add a new one!</p>}
        <Button variant="success" onClick={()=>{setModalOperation(null); setModalOperationShow(true)}}>Add an operation</Button>
        <ModalOperation
            show={modalOperationShow}
            onHide={() =>{
                setModalOperationShow(false);
                setModalOperation(null);
            }}
            key={modalOperation}
            operation={modalOperation}
            availableCounters={props.availableCounters}
        />
    </>;
}

function OperationSettingsRow(props){
    return <tr>
        <td>{props.operation.code}</td>
        <td>{props.operation.name}</td>
        <td>{props.operation.counters.map((c)=>{return c+" "})}</td>
        <td><Button size="sm" variant="primary" onClick={()=>props.editOperation()} style={{marginLeft: "1px", marginRight: "1px"}}>
                <Icon.Pencil/>
            </Button>
            <Button size="sm" variant="danger" onClick={()=>props.deleteCard()} style={{marginLeft: "1px", marginRight: "1px"}}>
                <Icon.Trash/>
            </Button>
        </td>
    </tr>
}

export default SettingsPage;