// @flow
/* eslint flowtype/require-return-type: 'off' */

import {GraphQLObjectType} from 'graphql';

import {fromGlobalId, nodeDefinitions} from 'graphql-relay';

import {getTodoOrThrow, getUserOrThrow, Todo, User} from '../database';

// $FlowFixMe graphql-relay types not available in flow-typed, strengthen this typing
const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId: string): ?{} => {
        const { type, id }: { id: string, type: string } = fromGlobalId(globalId);

        if (type === 'Todo') {
            return getTodoOrThrow(id);
        } else if (type === 'User') {
            return getUserOrThrow(id);
        }
        return null;
    },
    (obj: {}): ?GraphQLObjectType => {
        if (obj instanceof Todo) {
            return require('./types/GraphQLTodo').GraphQLTodo;
        } else if (obj instanceof User) {
            return require('./types/GraphQLUser').GraphQLUser;
        }
        return null;
    }
);

export { nodeField, nodeInterface };
