const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const VehicleAPI = require("./datasources/vehicle");

const typeDefs = gql`
    type Query {
        vehicles(id: ID!): [VehicleStatus]
    }

    type VehicleStatus {
        bike_id: String!
        lat: Float!
        lon: Float!
        is_reserved: Boolean!
        is_disabled: Boolean!
        vehicle_type: String!
    }
`;

/*
 * I originally added two resolvers that use the Helbiz API depending on the GraphQL Query.
 * I ran into trouble, so I combined the functionality of both resolves and queries into one.
 */
const resolvers = {
    Query: {
        vehicles: (_, { id }, { dataSources }) =>
            dataSources.vehicleAPI.getVehicles({ vehicleId: id }),
    },
};

/*
 * Initializes apollo server with types, resolvers, and the Helbiz API data source.
 */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        vehicleAPI: new VehicleAPI(),
    }),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
