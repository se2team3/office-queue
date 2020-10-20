const baseURL = "/api";

//get the list to be shown on the board
 async function getLastCustomers(){
     const response=await fetch("/api/LastCustomers")
    const object=response.json();
    if(response.ok){
        return object;
    }else{
        
        let error={error:response.status}
        throw error;
    } 
 }

 


async function callNextCustomer(counterId) {
    const response = fetch(baseURL + "/callNextCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(counterId),
        });
    const ticketJson = await response.json();
    
    if(response.ok){
        return ticketJson; // or Ticket.fromJson()
    }else{
        let err = { status: response.status, errObj: ticketJson };
        throw err;  // An object with the error coming from the server
    }
    
}


const API={getLastCustomers, callNextCustomer}
export default API