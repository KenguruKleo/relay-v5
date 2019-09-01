// @flow
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { nodeField } from './nodes.js';
import { UserQuery, UsersQuery } from './queries/UserQuery';
import { ChangeTodoStatusMutation } from './mutations/ChangeTodoStatusMutation';

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: UserQuery,
        users: UsersQuery,
        node: nodeField,
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        changeTodoStatus: ChangeTodoStatusMutation,
    },
});

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
