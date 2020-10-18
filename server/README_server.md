## API to support GUI
<!-- Endpoints are meant to be preceded by /api (/operations == /api/operations)-->
- GET `/operations`
  - Body: NONE
  - Response: List of possible operations (among all counters)
- POST `/createRequest`
  - Body: operationType (Payments/shippings...)
  - Response: ticket object (Type - Number in queue)
- GET `/requests`
  - Param: NONE (TBD if completed is a req. param. or is implemented client side )
  - Rsponse: List of requests (served)
- GET `/counters`
  - Param: NONE
  - Response: List of all counters
- GET `/counters/:counterId`
  - Param: counterId
  - Response: Counter object (Id, Operations, Customers in line)
- POST `/terminateRequest`
  - Body: ticketId
  - Response: NONE
- POST `/callNextCustomer`
  - Body: counterId
  - Response: ticketId <!-- Of called customer -->
- POST `/createCounter`
  - Body: List of possible operations (counterId may be obtained by auto-increment of id in DB)
  - Response: Counter object
- POST `/editCounter`
  - Body: List of possible operations, counterId
  - Response: counter object
- POST: `/createOperation`
  - Body: Operation object (Name - possible description)
  - Response: NONE

<!-- API does not include possible DELETE needed -->