# Helbiz Test

### Starting the Application

To start the application run the command below in the root directory of the Node application:

```
npm run dev
```

Both the React and the Node application will start up.

### How the Server is Setup

-   The server is setup using [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) with a GraphQL API.
-   The API has one query, "vehicles", that uses data from the Helbiz API.
-   The vehicles query requires an ID to be passed as input.
-   If the ID is an empty string, the API will respond with an array of all of the vehicles. Otherwise, the API will respond with an array containing information from the vehicle with the matching ID.
-   If no vehicle with the given ID is found, the query returns an array with one null value inside.

### How the Client is Setup

-   When the page loads, a query is sent to the API to fetch all of the vehicle information.
-   When a user submits an ID to be searched, the initial GraphQL query is refetched, and the responding data will fill the table.
-   The table is setup using the [Material UI Table Component](https://material-ui.com/components/tables/).
-   The VehicleInput component is used to keep track of the input field used for the table.
-   The VehicleTable component contains a VehicleInput component and the table itself.

### Challenges

-   Understanding how GraphQL and apollo work on both ends of the stack.
-   Passing parameters into a GraphQL Query using apollo client.
-   Utilizing two separate queries to handle the functionality of the project. I had to combine the queries into one to make things easier.

### What I Learned

-   How to work with GraphQL and apollo on both ends of the stack.
-   To double check the type of the parameters I declare in my queries on the client (ID instead of String).
-   How to work with useLazyQuery and useQuery.
-   The benefits of useRef in React.
