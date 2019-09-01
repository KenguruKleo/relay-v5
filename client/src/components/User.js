// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../api/relay-environment';
import type {userQuery} from 'relay/userQuery.graphql';
import TodoList from './UserTodoList';

type Props = {
    userId: string,
}

export default class User extends React.Component<Props> {
    render () {
        const { userId } = this.props;
        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
                  query User_Query($userId: String) {
                    user(id: $userId) {
                      id,
                      userId,
                      ...UserTodoList_userTodoList
                    }  
                  }
                `}
                variables={{
                    userId,
                }}
                render={({ error, props }: { error: ?Error, props: userQuery }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return (
                        <div>
                            <div>User ID: {props.user.id}</div>
                            <TodoList userTodoList={props.user} />
                        </div>
                    );
                }}
            />
        );
    }
}
