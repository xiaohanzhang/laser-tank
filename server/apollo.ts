import { ApolloServer, gql } from 'apollo-server-koa';

import { IUser } from './models/User';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    type User {
        _id: String
        name: String
        email: String
    }

    type Query {
        viewer: User
    }
`;

type Context = { user: IUser } & {};

const resolvers: {
    [key: string]: {
        [key: string]: (parent?: any, args?: any, context?: Context, info?: any) => Promise<any> | any
    }
} = {
    Query: {
        viewer: (parent, args, ctx, info) => {
            return ctx.user;
        }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export default new ApolloServer({
    typeDefs, resolvers,
    context: ({ ctx }) => {
        return { user: ctx.user };
    }
});
