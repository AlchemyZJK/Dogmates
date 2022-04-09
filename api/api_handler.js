const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphqldate.js');
const test = require('./test.js');
const pet = require('./pet.js');
const posting = require('./posting.js');

const resolvers = {
  Query: {
    test: test.getMessage,
    petInf: pet.Inf,
    postingInf: posting.Inf,
  },
  Mutation: {
    petLogin: pet.login,
    petRegister: pet.register,
    addPosting: posting.add,
    deletePosting: posting.delet
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  await server.start();
  await server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
