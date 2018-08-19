import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { allTodos } from './todos';

const app = express();
app.use(cors());
app.use((_, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return next();
});
const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }
  type Query {
    allTodos(
      count: Int
    ): [Todo]
  }
`;
const resolvers = {
  Query: {
    allTodos,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
