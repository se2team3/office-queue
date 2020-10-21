import Counter from '../api/Counter';
import Operation from '../api/Operation';

const baseURL = "/api";

//get the list to be shown on the board
 async function getLastCustomers(){
     const response=await fetch("/api/lastCustomers")
    const object=response.json();
    if(response.ok){
        return object;
    }else{
        
        let error={error:response.status}
        throw error;
    } 
 }

 

//it asks to the server who is the next customer and it updates the "called" and timeServed fields, 
//it also inserts the number of the counter that will serve the customer
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
//retrieves from the server the counters list
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
//inserts a new counter that is inside the body request
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
//deletes the counter given its id
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
//retrieves from the server all the operations
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
//inserts a new operation
async function addOperation(operation) {
    let response;
    try {
        response = await fetch(baseURL + "/operation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(operation),
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
//deletes a new operation given its id
async function deleteOperation(operationId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/operation/" + operationId, {
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
//when a new customer arrives this function will add him in the queue
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

async function updateCounterOperation(operation,countersList) {
    
    await fetch(baseURL + "/counterOperations/" + operation, {
        method: 'DELETE'
    });

/*     console.log('Operation: '+ operation);
    console.log('counters: '+ countersList); */

    let insertionQueries = countersList.map((c) => fetch(baseURL + "/counterOperations", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({counter_id: c, operation_code: operation}),
    }))
    Promise.all([...insertionQueries])
    .then((res)=> console.log('ok'))
    .catch((err) => console.log(err));

}


const API={getLastCustomers, callNextCustomer, getCounters, addCounter,
     deleteCounter, getOperations, addOperation, deleteOperation, getTicket, updateCounterOperation}

export default API