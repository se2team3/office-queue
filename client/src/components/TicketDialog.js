import React from 'react';
import { Modal, Button, Row} from 'react-bootstrap';


const TicketDialog = (props) => {

    let { ticket, show, handleHide } = props;

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                {/*  <Modal.Title>Payment</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-sm-center">
                    <h6>Your number is:</h6>
                </Row>
                <Row className="justify-content-sm-center">
                    <h1>{`${ticket.code} ${ticket.number}`}</h1>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default TicketDialog;