import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {connectionArgs, connectionDefinitions, connectionFromArray, globalIdField} from 'graphql-relay';
import {getTodosForUser, User} from '../../database';
import {TodosConnection} from './GraphQLTodo';
import { nodeInterface } from '../nodes';

const GraphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: globalIdField('User'),
        userId: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (user: User): string => {
                console.log('user', user);
                return user.id;
            },
        },
        todos: {
            type: TodosConnection,
            args: {
                status: {
                    type: GraphQLString,
                    defaultValue: 'any',
                },
                ...connectionArgs,
            },
            // eslint-disable-next-line flowtype/require-parameter-type
            resolve: (user: User, {status, after, before, first, last}) => {
                return connectionFromArray([...getTodosForUser(user.id, status)], {
                    after,
                    before,
                    first,
                    last,
                });
            },
        },
        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (user: User): number => getTodosForUser(user.id).length,
        },
        completedCount: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (user: User): number => getTodosForUser(user.id, 'completed').length,
        },
    },
    interfaces: [nodeInterface],
});

const {
    connectionType: UsersConnection,
    edgeType: GraphQLUserEdge,
} = connectionDefinitions({
    name: 'User',
    nodeType: GraphQLUser,
});

export {GraphQLUser, UsersConnection, GraphQLUserEdge};
