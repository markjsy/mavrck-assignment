import 'reflect-metadata';
import * as tq from 'type-graphql';
import { PostCreateInput, PostResolver, SortOrder } from './resolvers/PostResolver';
import { UserResolver } from './resolvers/UserResolver';
import { ApolloServer } from 'apollo-server-express';
import { DateTimeResolver } from 'graphql-scalars';
import { context } from './singleton/Context';
import { GraphQLScalarType } from 'graphql';
import express from 'express';

const app = async () => {
    tq.registerEnumType(SortOrder, {
        name: 'SortOrder'
    });

    const schema = await tq.buildSchema({
        resolvers: [PostResolver, UserResolver, PostCreateInput],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
    });

    const server = new ApolloServer({ schema, context: context });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    await new Promise((_resolve): any => app.listen({ port: 1000 }));
    console.log(`🚀 Server ready at http://localhost:1000${server.graphqlPath}`);
};

app();
