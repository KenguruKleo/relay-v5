import {GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {connectionDefinitions, globalIdField} from 'graphql-relay';
import {Todo} from '../../database';
import { nodeInterface } from '../nodes';

const GraphQLTodo = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: globalIdField('Todo'),
        text: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (todo: Todo): string => todo.text,
        },
        complete: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: (todo: Todo): boolean => todo.complete,
        },
        userId: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (todo: Todo): string => todo.userId,
        },
    },
    interfaces: [nodeInterface],
});

const {
    connectionType: TodosConnection,
    edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
    name: 'Todo',
    nodeType: GraphQLTodo,
});

export {GraphQLTodo, TodosConnection, GraphQLTodoEdge};
