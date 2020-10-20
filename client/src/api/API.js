import Counter from '../api/Counter';
import Operation from '../api/Operation';

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

async function getCounters() {
    const response = await fetch(baseURL + "/counters");
    const countersJson = await response.json();
    if(response.ok){
        return countersJson.map(
            (c) => new Counter(c.id, c.operations));
    } else {
        let err = {status: response.status, errObj:countersJson};
        throw err;  // An object with the error coming from the server
    }
}

async function addCounter(counter) {
    let response;
    try {
        response = await fetch(baseURL + "/counter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(counter),
        });
    }
    catch(err){
        throw({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
    }

    if(response.ok){
        try{
            let responseJson = await response.json();
            return responseJson.id;
        }
        catch(err){
            throw({ errors: [{ param: "Application", msg: "Cannot parse response" }] });
        }
    }
    else throw {status: response.status};
}

async function deleteCounter(counterId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/counter/" + counterId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then( (obj) => {reject(obj);} ) // error msg in the response body
                    .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getOperations() {
    const response = await fetch(baseURL + "/operations");
    const operationsJson = await response.json();
    if(response.ok){
        return operationsJson.map(
            (o) => new Operation(o.code, o.name, o.description, o.counters));
    } else {
        let err = {status: response.status, errObj:operationsJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getTicket(opId) {
    const response = await fetch(baseURL + "/createRequest", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: opId}),
    });
    const ticketJson = await response.json();
    if(response.ok){
        return ticketJson;
    } else {
        let err = {status: response.status, errObj:ticketJson};
        throw err;  // An object with the error coming from the server
    }
}

const API={getLastCustomers, callNextCustomer, getCounters, addCounter, deleteCounter, getOperations, getTicket}
export default API