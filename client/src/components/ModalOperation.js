import React, { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Modal, Button, Form, Col} from "react-bootstrap";

function ModalOperation(props){

    const [name,setName] = useState(props.operation?props.operation.name:"");
    const [code,setCode] = useState(props.operation?props.operation.code:"");
    const [description,setDescription] = useState(props.operation?props.operation.description:"");
    const [multiSelections, setMultiSelections] = useState(props.operation?props.operation.counters.map((n)=>{return {label: n.id.toString(), id: n.id}}):[]);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.operation?"Edit operation":"Add operation"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event) => {
                event.preventDefault()
                props.onHide()
            }}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Operation name</Form.Label>
                            <Form.Control type="text" placeholder="Enter the operation name" value={name} onChange={(ev)=>setName(ev.target.value)} />
                        </Form.Group>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Operation code (keep it short, one or two letters)</Form.Label>
                            <Form.Control type="text" placeholder="Enter the operation code" value={code} onChange={(ev)=>setCode(ev.target.value)} />
                        </Form.Group>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Operation description</Form.Label>
                            <Form.Control type="text" placeholder="Enter the operation description" value={description} onChange={(ev)=>setDescription(ev.target.value)} />
                        </Form.Group>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Counters for this operation</Form.Label>
                        {props.availableCounters.length==0?<p>There are 0 counters in this office right now, you should add some first!</p>:<Typeahead
                            id="basic-typeahead-multiple"
                            labelKey="label"
                            multiple
                            onChange={setMultiSelections}
                            options={props.availableCounters}
                            placeholder="Write counters' numbers..."
                            selected={multiSelections}
                        />}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                    <Button type="submit" variant="success">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalOperation;