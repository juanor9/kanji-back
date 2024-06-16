import { ApolloServer } from 'apollo-server';
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
    cache: 'bounded',
    persistedQueries: {
      cache: new Map(),  // Puedes usar una implementación de caché específica aquí
    },
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
