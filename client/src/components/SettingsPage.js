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

    const [numberOfCounters, setNumberOfCounters] = useState(props.counters.length); //TODO get from backend
    const [operations, setOperations] = useState(props.operations); //TODO get from backend

    let {getCounters, getOperations} = props;

    useEffect(() => {
        getCounters();
        getOperations();
    }, []);

    useEffect(() => {
        setNumberOfCounters(props.counters.length)
    }, [props.counters.length]);

    useEffect(() => {
        setOperations(props.operations)
    }, [props.operations]);
    
    
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
                <Form onSubmit={(event) => {
                    event.preventDefault()
                    props.updateCounters(numberOfCounters)
                }}>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>How many counter are there in the office?</Form.Label>
                            <Form.Control type="number" placeholder="Enter number of counters" value={numberOfCounters} onChange={(ev)=>{setNumberOfCounters(ev.target.value)}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col xs="auto" >
                            <Button type="submit" variant="success">Save</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col>
                <h2>Operations</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <OperationsSettings
                    operations={operations}
                    availableCounters={props.counters.map((n)=>{return {label: n.id.toString(), id: n.id}})}
                    addOperation={props.addOperation}
                    editOperation={props.editOperation}
                />
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
            addOperation={props.addOperation}
            editOperation={props.editOperation}
        />
    </>;
}

function OperationSettingsRow(props){
    return <tr>
        <td>{props.operation.code}</td>
        <td>{props.operation.name}</td>
        <td>{props.operation.counters.join(" ")}</td>
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