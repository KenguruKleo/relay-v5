// @flow
import type {Todo_todo} from 'rely/__generated__/relay/Todo_todo.graphql';

import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';

type Props = {
    todo: Todo_todo
}

class Todo extends React.Component<Props> {
    handleOnCheckboxChange = (e: { target: { checked: boolean } }) => {
        const complete = e.target.checked;
        ChangeTodoStatusMutation.commit(
            this.props.relay.environment,
            complete,
            this.props.todo,
            this.props.user,
        );
    };

    render () {
        const {complete, text} = this.props.todo;

        return (
            <li>
                <div>
                    <input
                        onChange={this.handleOnCheckboxChange}
                        checked={complete}
                        type="checkbox"
                    />
                    <label>
                        {text}
                    </label>
                </div>
            </li>
        );
    }
}

export default createFragmentContainer(
    Todo,
    // Each key specified in this object will correspond to a prop available to the component
    {
        todo: graphql`
            # As a convention, we name the fragment as '<ComponentFileName>_<propName>'
            fragment Todo_todo on Todo {
                id
                complete
                text
            }
        `,
        user: graphql`
            fragment Todo_user on User {
                id
                userId
                totalCount
                completedCount
            }
        `,
    },
);
