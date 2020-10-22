import React from 'react';
import Table from 'react-bootstrap/Table';
import {Row,Col,Container} from 'react-bootstrap';
import moment from 'moment';
import API from '../api/API';

class Board extends React.Component{
    constructor(props){
        super();
        this.state={vett:[]}
    }


    
    async componentDidMount(){
        let ret;
        API.getLastCustomers()
        .then((res) => {
            console.log(res);
            this.setState({vett: res});
        })
        .catch((err)=> console.log(err));
        setInterval(async ()=>{
            API.getLastCustomers()
        .then((res) => {
            console.log(res);
            this.setState({vett: res});
        })
        },3000)
}

    renderHalfBoard= (postion)=>{
        let startIndex, endIndex;
        if(postion==0){
            // first half
            startIndex = 0;
            endIndex = Math.min(7,(this.state.vett.length));
        }else{
            startIndex = 7;
            endIndex = Math.min(14,(this.state.vett.length));
        }
        return (
            <Col>
                <Table striped hover size='lg' >
                 <thead className="tableHeader">
                     <tr>
                        <th>COUNTER</th>
                        <th>CUSTOMER</th>
                     </tr>
                    </thead>
                    <tbody>{
                        
                        (this.state.vett).slice(startIndex,endIndex).map((e)=>{
                        let a=moment();
                        let b=moment(e.time_served,"YYYY-MM-DD hh:mm:ss");
                        let c=a.diff(b,'seconds');
                        return (
                                <tr key={e.counter+e.ticket_number}>
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.counter}</td> :<td>{e.counter}</td> }
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{`${e.request_type} ${e.ticket_number}`}</td> :<td>{`${e.request_type} ${e.ticket_number}`}</td> }
                                    
                                </tr>
                                
                         )})}
                    </tbody>
                </Table>
            </Col>

        );
    }
  
    


    render(){
        return(  <Container  >
        <Row>
            {this.renderHalfBoard(0)}
            {this.renderHalfBoard(1)}
        </Row>

    </Container>);
}

}

 export default Board