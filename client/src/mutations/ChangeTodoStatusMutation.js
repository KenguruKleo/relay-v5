// @flow
import type {Todo_todo} from 'rely/__generated__/relay/Todo_todo.graphql';
import type {Todo_user} from 'rely/__generated__/relay/Todo_user.graphql';
import type {
    ChangeTodoStatusInput,
    ChangeTodoStatusMutationResponse,
} from 'relay/ChangeTodoStatusMutation.graphql';

import {
    commitMutation,
    graphql,
    type Disposable,
    type Environment,
} from 'react-relay';

// We start by defining our mutation from above using `graphql`
const mutation = graphql`
    mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
        changeTodoStatus(input: $input) {
            todo {
                id
                complete
            }
            user {
                id
                completedCount
            }
        }
    }
`;

function getOptimisticResponse (
    complete: boolean,
    todo: Todo_todo,
    user: Todo_user,
): ChangeTodoStatusMutationResponse {
    return {
        changeTodoStatus: {
            todo: {
                complete: complete,
                id: todo.id,
            },
            user: {
                id: user.id,
                completedCount: complete
                    ? user.completedCount + 1
                    : user.completedCount - 1,
            },
        },
    };
}

function commit (
    environment: Environment,
    complete: boolean,
    todo: Todo_todo,
    user: Todo_user,
): Disposable {
    // Now we just call commitMutation with the appropriate parameters
    const input: ChangeTodoStatusInput = {
        complete,
        id: todo.id,
        userId: user.userId,
    };
    return commitMutation(
        environment,
        {
            mutation,
            variables: {
                input,
            },
            optimisticResponse: getOptimisticResponse(complete, todo, user),
        }
    );
}

export default {commit};
