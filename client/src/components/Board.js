import React from 'react';
import Table from 'react-bootstrap/Table';
import {Row,Col,Container} from 'react-bootstrap';
import moment from 'moment';

class Board extends React.Component{
    constructor(props){
        super();
        this.state={vett:[]}
    }


    
    async componentDidMount(){
        let ret;
        ret=await this.props.getLastCustomers()
        this.setState({vett:ret});
         setInterval(async ()=>{
             ret=await this.props.getLastCustomers();
            this.setState({vett:ret})
            },3000)
    }

  
    


    render(){
        return(  <Container  >
        <Row>
            <Col>
                <Table striped hover size='lg' >
                 <thead className="tableHeader">
                     <tr>
                        <th>COUNTER</th>
                        <th>CUSTOMER</th>
                     </tr>
                    </thead>
                    <tbody>{
                        
                        (this.state.vett).slice(0,Math.min(7,(this.state.vett.length))).map((e)=>{
                        let a=moment();
                        let b=moment(e.timeServed,"YYYY-MM-DD hh:mm:ss");
                        let c=a.diff(b,'seconds');
                        return (
                                <tr key={e.Counter+e.Customer}>
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.Counter}</td> :<td>{e.Counter}</td> }
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.Customer}</td> :<td>{e.Customer}</td> }
                                    
                                </tr>
                                
                         )})}
                    </tbody>
                </Table>
            </Col>

            <Col>
             <Table striped  hover  size='lg'>
                 <thead className="tableHeader" >
                     <tr>
                        <th>COUNTER</th>
                        <th>CUSTOMER</th>
                     </tr>
                    </thead>
                    <tbody>{
                        this.state.vett.slice(7,this.state.vett.end).map((e)=>{
                        let a=moment();
                        let b=moment(e.timeServed,"YYYY-MM-DD hh:mm:ss");
                        let c=a.diff(b,'seconds');
                        return ( <tr key={e.Counter+e.Customer}>
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.Counter}</td> :<td>{e.Counter}</td> }
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.Customer}</td> :<td>{e.Customer}</td> }
                                </tr>)
                         })}
                    </tbody>
             </Table>
            </Col> 
        </Row>

    </Container>);
}

}

 export default Board