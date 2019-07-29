// @flow
import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';

import type {Todo_todo} from 'rely/__generated__/relay/Todo_todo.graphql';

type Props = {
    todo: Todo_todo
}

class Todo extends React.Component<Props> {
    render () {
        const {complete, text} = this.props.todo;

        return (
            <li>
                <div>
                    <input
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
                complete
                text
            }
        `,
    },
);
