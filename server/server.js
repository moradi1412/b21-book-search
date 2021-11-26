const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//import apollo 
const { ApolloServer } = require ('apollo-server-express')

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

//appllo Server
const startServer = async () => {  
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });
}; 

//start the server 
await server.start(); 
//middleware 
server.applyMiddleware({ app });
// test log 
console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

//init the apollo server
startServer();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});