import 'reflect-metadata';
import * as tq from 'type-graphql';
import { PostCreateInput, PostResolver, SortOrder } from './resolvers/PostResolver';
import { UserResolver } from './resolvers/UserResolver';
import { ApolloServer } from 'apollo-server';
import { DateTimeResolver } from 'graphql-scalars';
import { context } from './singleton/Context';
import { GraphQLScalarType } from 'graphql';
import express from 'express';

async function app() {
    const PORT = process.env.PORT || 2500;
    const schema = await tq.buildSchema({
        resolvers: [PostResolver, UserResolver],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
    });

    const server = new ApolloServer({
        schema: schema,
        context: context,
        playground: true,
        cors: true
    });

    server.listen({ port: PORT }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}/graphql`);
    });
}

app();
