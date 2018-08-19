import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use((_, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return next();
});
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);