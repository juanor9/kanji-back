import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/Query.js';
import connectDb from '../config/db.js';

dotenv.config();
const port = process.env.PORT || 8080;

// Set config file to Mongo
connectDb();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});