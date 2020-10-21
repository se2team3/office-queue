# API to support GUI
<!-- Endpoints are meant to be preceded by /api (/operations == /api/operations)-->
## Counters
- GET `/counters`
  - Param: NONE
  - Response: List of all counters
- GET `/counters/:counterId`
  - Param: counterId
  - Response: Counter object (Id, Operations, Customers in line)
- POST `/editCounter`
  - Response: counter object
  - Body: List of possible operations, counterId
- POST `/createCounter`
  - Body: List of possible operations (counterId may be obtained by auto-increment of id in DB)
  - Response: Counter object

## Operations
- GET `/operations`
  - Body: NONE
  - Response: List of possible operations (among all counters)
- POST: `/operation`
  - Body: Operation object (Code - Name - Possible description)
  - Response: NONE
- PUT: `/operation/:operationID`
  - Body: Operation object (Code - Name - Possible description)
  - Response: NONE
- DELETE: `/operation/:operation_id`
  - Param: operationId
  - Response: NONE
## Requests (Queue)
- POST `/createRequest`
  - Body: operationType (Payments/shippings...)
  - Response: ticket object (Type - Number in queue)
- GET `/lastCustomers`
  - Param: NONE
  - Response: List of the 14 most recent called customers
- PUT `/callNextCustomer`
  - Body: counterId
  - Response: NONE

## Counter-Operations
- POST: `/counterOperations`
  - Body: counterId, operationCode
  - Response: id of the added row
- DELETE: `/counterOperations/:operation_code`
  - Param: operationCode
  - Response: NONE


<!-- API does not include possible DELETE needed -->