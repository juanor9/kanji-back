import { ApolloServer } from 'apollo-server';
// import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import * as dotenv from 'dotenv';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/Query.js';
import connectDb from '../config/db.js';

dotenv.config();
const port = process.env.PORT || 8080;

// Conectar a MongoDB
connectDb().then(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      // Customize error message
      console.error(err);
      return err;
    },
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}).catch(error => {
  console.error('Error connecting to the database', error);
});
