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
        console.log(ret)
        this.setState({vett:ret});
         setInterval(async ()=>{
             ret=await this.props.getLastCustomers()
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
                        let b=moment(e.time_served,"YYYY-MM-DD hh:mm:ss");
                        let c=a.diff(b,'seconds');
                        return (
                                <tr key={e.counter+e.id}>
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.counter}</td> :<td>{e.counter}</td> }
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.id}</td> :<td>{e.id}</td> }
                                    
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
                        let b=moment(e.time_served,"YYYY-MM-DD hh:mm:ss");
                        let c=a.diff(b,'seconds');
                        return ( <tr key={e.counter+e.id}>
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.counter}</td> :<td>{e.counter}</td> }
                                    {c<=30 ?<td style={{"background-color":"#a8f7b8"}}>{e.id}</td> :<td>{e.id}</td> }
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