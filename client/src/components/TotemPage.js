import React from 'react';
import { Button, Row, Alert, Col, Container, Jumbotron, Card } from "react-bootstrap";
import TotemItem from './TotemItem';
import TicketDialog from './TicketDialog';

const testTicket = {code: 'A', number: 42};

const demoOperations = [
    { code: "Y", name: "Yoga", description: "Yoga sessions outdoor and indoor", counters: [1, 2, 3, 4, 8, 12] },
    { code: "P", name: "Payments", description: "Everything concerning money", counters: [1, 2, 4, 5] },
    { code: "S", name: "Services", description: "Services for customer of services", counters: [1, 3, 4, 8, 12] }
]

class TotemPage extends React.Component {

    constructor(props){
        super();
        this.state = {
            operations: [], // TODO get real operations
            showTicketDialog: false,
            ticket: {}
        }
    }

    onGetNumberPressed= (code)=>{
        console.log("Selected code: "+ code);
        // TODO call API
        /* API.getTicket(code)
        .then((newTicket) => this.setState({ticket: newTicket}))
        .catch((err) => handleError); */
        this.setState({showTicketDialog:true});
    }

    hideTicketDialog = () => {
        this.setState({ showTicketDialog: false });
    }

    render() {
        return <>
            <Jumbotron>
                <h1>Welcome!</h1>
                <p>
                    Click on the button corresponding to the operation you want to perform and wait for your number to be called.
            </p>
            </Jumbotron>
            <Container fluid>
                <Row>
                    {demoOperations.map((op) => <TotemItem op={op} key={op.code} onGetNumberPressed={this.onGetNumberPressed}></TotemItem>)}
                </Row>
            </Container>
            <TicketDialog ticket={testTicket} show={this.state.showTicketDialog} handleHide={this.hideTicketDialog}/>
        </>
    }
}

export default TotemPage;