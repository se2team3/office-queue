import React from 'react';

class board extends React.Component{
    constructor(props){
        this.state={vett=[{Counter:1,Customer:'a'},{Counter:1,Customer:'b'},{Counter:1,Customer:'c'},{Counter:1,Customer:'d'},{Counter:1,Customer:'e'},{Counter:1,Customer:'f'},{Counter:1,Customer:'g'},{Counter:1,Customer:'h'}]}
    }

    componentDidMount(){}

  
    


    render(){
        return  <table className='table table-striped' style={{'width': '100%', 'height': '100%'}}>
        <tbody>
          <tr>
            <th>
                 <table>
                    <thead className="thead-dark " >
                     <tr>
                        <th>Counter</th>
                        <th>Customer</th>
                     </tr>
                    </thead>
                    <tbody>{
                        this.state.vett.slice(0,7).map((e)=>{
                        return ( <tr key={e.Counter+e.Customer}>
                                    <td>{e.Counter}</td>
                                    <td>{e.Customer}</td>
                                </tr>)
                         })}
                    </tbody>
                 </table>
            </th>

            <th>
                 <table>
                    <thead className="thead-dark " >
                     <tr>
                        <th>Counter</th>
                        <th>Customer</th>
                     </tr>
                    </thead>
                    <tbody>{
                        this.state.vett.slice(7,this.state.vett.end).map((e)=>{
                        return ( <tr key={e.Counter+e.Customer}>
                                    <td>{e.Counter}</td>
                                    <td>{e.Customer}</td>
                                </tr>)
                         })}
                    </tbody>
                 </table>
            </th>

        </tr> 
      </tbody>
    </table>
}




        
 }