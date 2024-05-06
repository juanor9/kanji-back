import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/Query.js';
import mongoose from 'mongoose';

// Configuración de la conexión a MongoDB
const MONGO_URI = 'mongodb+srv://juan:YVQxTHOLdh7cFJ8O@caikei.i4nc3u3.mongodb.net/'; 

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🔗 Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));


const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});