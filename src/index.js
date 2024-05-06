import { ApolloServer } from 'apollo-server';
// import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
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
  resolvers,
  // plugins: [ApolloServerPluginLandingPageDisabled()],
});

server.listen(port).then(({ url }) => {
  const publicUrl = process.env.PUBLIC_URL || url;
  console.log(`🚀 Server ready at ${publicUrl}`);
});