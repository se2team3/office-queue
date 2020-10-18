import React from 'react';
import Table from 'react-bootstrap/Table';
import {Row,Col,Container} from 'react-bootstrap';

class Board extends React.Component{
    constructor(props){
        super();
        this.state={vett:[{Counter:1,Customer:'a',CallTime:1},{Counter:1,Customer:'b',CallTime:1},{Counter:1,Customer:'c',CallTime:0},{Counter:1,Customer:'d',CallTime:0},{Counter:1,Customer:'e',CallTime:0},{Counter:1,Customer:'f',CallTime:0},{Counter:1,Customer:'g',CallTime:0},{Counter:1,Customer:'h',CallTime:0},{Counter:1,Customer:'i',CallTime:0}]}
    }

    componentDidMount(){}

  
    


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
                        this.state.vett.slice(0,7).map((e)=>{
                        return (
                                <tr key={e.Counter+e.Customer}>
                                    {e.CallTime==1 ?<td style={{"background-color":"#a8f7b8"}}>{e.Counter}</td> :<td>{e.Counter}</td> }
                                    {e.CallTime==1 ?<td style={{"background-color":"#a8f7b8"}}>{e.Customer}</td> :<td>{e.Customer}</td> }
                                    
                                </tr>
                                
                         )})}
                    </tbody>
                </Table>
            </Col>

            <Col>
             <Table striped  hover  size='lg'>
                 <thead className="tableHeader" style={{'margin-top':'0px'}}>
                     <tr>
                        <th>COUNTER</th>
                        <th>CUSTOMER</th>
                     </tr>
                    </thead>
                    <tbody>{
                        this.state.vett.slice(7,this.state.vett.end).map((e)=>{
                        return ( <tr key={e.Counter+e.Customer}>
                                    {e.CallTime==1 ?<td style={{"background-color":"#a8f7b8"}}>{e.Counter}</td> :<td>{e.Counter}</td> }
                                    {e.CallTime==1 ?<td style={{"background-color":"#a8f7b8"}}>{e.Customer}</td> :<td>{e.Customer}</td> }
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