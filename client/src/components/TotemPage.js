import React from 'react';
import { Row, Container, Jumbotron} from "react-bootstrap";
import TotemItem from './TotemItem';
import TicketDialog from './TicketDialog';
import API from '../api/API';

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

    componentDidMount(){
        API.getOperations()
        .then((ops) => this.setState({operations: ops}))
        .catch((err) => console.log(err));
    }
    onGetNumberPressed= (code)=>{
        API.getTicket(code)
        .then((newTicket) => {
            this.setState((state) => ({ticket: newTicket, showTicketDialog:true}))})
        .catch((err) => console.log(err));
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
                    {this.state.operations.map((op) => <TotemItem op={op} key={op.code} onGetNumberPressed={()=>this.onGetNumberPressed(op.code)}></TotemItem>)}
                </Row>
            </Container>
            <TicketDialog ticket={this.state.ticket} show={this.state.showTicketDialog} handleHide={this.hideTicketDialog}/>
        </>
    }
}

export default TotemPage;