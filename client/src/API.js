const baseURL = "/api";

//REAL FUNCTION to get the list to be shown on the board
/* async function getBoardList(){
     const response=await fetch("/api/BoardList")
    const object=await response.json();
    if(response.ok){
        return object;
    }else{
        let error={error:response.status}
        throw error;
    } */

    //FAKE FUNCTION
    function getBoardList(){
    let vett=[{Counter:1,Customer:'a',timeServed:"17:43:00"},{Counter:1,Customer:'b',timeServed:"16:00:00"},{Counter:1,Customer:'c',timeServed:"16:00:00"},{Counter:1,Customer:'d',timeServed:"16:00:00"},{Counter:1,Customer:'e',timeServed:"16:00:00"},{Counter:1,Customer:'f',timeServed:"16:00:00"},{Counter:1,Customer:'g',timeServed:"16:00:00"},{Counter:1,Customer:'h',timeServed:"16:00:00"},{Counter:1,Customer:'i',timeServed:"16:00:00"}];
    return vett;
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


const API={getBoardList, callNextCustomer}
export default API