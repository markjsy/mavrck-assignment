import 'reflect-metadata';
import * as tq from 'type-graphql';
import { PostResolver } from './resolvers/PostResolver';
import { UserResolver } from './resolvers/UserResolver';
import { ApolloServer } from 'apollo-server';
import { DateTimeResolver } from 'graphql-scalars';
import { context } from './singleton/Context';
import { GraphQLScalarType } from 'graphql';
import { CONFIG } from './all-configs/config';

enum SortOrder {
    asc = 'asc',
    desc = 'desc'
}

async function app() {
    const schema = await tq.buildSchema({
        resolvers: [PostResolver, UserResolver],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
    });

    const server = new ApolloServer({
        schema: schema,
        context: context,
        playground: true,
        subscriptions: {
            path: '/subscriptions'
        },
        cors: true
    });

    server.listen({ port: CONFIG.GRAPHQL.GRAPHQL_PORT }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}graphql`);
    });
}

app();
