// @flow
import { GraphQLString } from 'graphql';
import { UsersConnection } from '../types/GraphQLUser';
import { User, getUserOrThrow, getUsers } from '../../database';
import {
    connectionArgs,
    connectionFromArray,

} from 'graphql-relay';
import {GraphQLUser} from '../types/GraphQLUser';

type Input = {
    +userId: string,
    ...args
};

const UserQuery = {
    type: GraphQLUser,
    args: {
        userId: { type: GraphQLString },
    },
    resolve: (root: {}, { userId }: Input): User => getUserOrThrow(userId),
};

const UsersQuery = {
    type: UsersConnection,
    args: {
        userId: {
            type: GraphQLString,
        },
        ...connectionArgs,
    },
    resolve: (root: {}, { userId, ...args }: Input): UsersConnection =>
        connectionFromArray(
            userId ? [getUserOrThrow(userId)] : getUsers(),
            args
        ),

};

export { UserQuery, UsersQuery };
