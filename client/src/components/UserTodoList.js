// @flow
import type {UserTodoList_userTodoList} from 'relay/UserTodoList_userTodoList.graphql';
import type {Todo_todo} from 'relay/Todo_todo.graphql';

import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Todo from './todo';

type Props = {
    userTodoList: UserTodoList_userTodoList,
}

class UserTodoList extends React.Component<Props> {
    render () {
        const {
            userTodoList: {
                totalCount,
                completedCount,
                todos,
            },
        } = this.props;

        return (
            <section>
                <input
                    checked={totalCount === completedCount}
                    type="checkbox"
                />
                <ul className="todo-list">
                    {todos.edges.map((edge: { key: string, todo: Todo_todo }) =>
                        <Todo
                            key={edge.node.id}
                            todo={edge.node}
                            user={this.props.userTodoList}
                        />
                    )}
                </ul>
            </section>
        );
    }
}

export default createFragmentContainer(
    UserTodoList,
    {
        userTodoList: graphql`
            fragment UserTodoList_userTodoList on User {
                todos(
                    first: 2147483647  # max GraphQLInt, to fetch all todos
                ) {
                    edges {
                        node {
                            id,
                            ...Todo_todo,
                        },
                    },
                },
                id,
                userId,
                totalCount,
                completedCount
                ...Todo_user,
            }
        `,
    },
);
