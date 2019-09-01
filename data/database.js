//@flow
export class Todo {
  +id: string;
  +text: string;
  +complete: boolean;
  +userId: string;

  constructor ({id, complete, text, userId}: { complete: boolean, id: string, text: string, userId: string }) {
      this.id = id;
      this.text = text;
      this.complete = complete;
      this.userId = userId;
  }
}

export class User {
  +id: string;

  constructor (id: string) {
      this.id = id;
  }
}

// Mock user database table
const usersById: Map<string, User> = new Map([
    ['me', new User('me')],
    ['you', new User('you')],
]);

// Mock todo database table
const todosById: Map<string, Todo> = new Map();
const todoIdsByUser: Map<string, $ReadOnlyArray<string>> = new Map([
    ['me', []],
    ['you', []],
]);

// Seed initial data
let nextTodoId: number = 0;
addTodo('me', 'Taste JavaScript', true);
addTodo('me', 'Buy a unicorn', false);
addTodo('you', 'Test you', false);
addTodo('you', 'Test second', true);
addTodo('you', 'Third test', true);

function getTodoIdsForUser (id: string): $ReadOnlyArray<string> {
    return todoIdsByUser.get(id) || [];
}

export function addTodo (userId: string, text: string, complete: boolean): string {
    const todo = new Todo({
        id: `${nextTodoId++}`,
        text,
        complete,
        userId,
    });
    todosById.set(todo.id, todo);

    const todoIdsForUser = getTodoIdsForUser(userId);
    todoIdsByUser.set(userId, todoIdsForUser.concat(todo.id));

    return todo.id;
}

export function changeTodoStatus (id: string, complete: boolean) {
    const todo = getTodoOrThrow(id);

    // Replace with the modified complete value
    todosById.set(id, new Todo(id, todo.text, complete));
}

// Private, for strongest typing, only export `getTodoOrThrow`
function getTodo (id: string): ?Todo {
    return todosById.get(id);
}

export function getTodoOrThrow (id: string): Todo {
    const todo = getTodo(id);

    if (!todo) {
        throw new Error(`Invariant exception, Todo ${id} not found`);
    }

    return todo;
}

export function getTodosForUser (userId: string, status: string = 'any'): $ReadOnlyArray<Todo> {
    const todoIdsForUser = getTodoIdsForUser(userId);
    const todosForUser = todoIdsForUser.map(getTodoOrThrow);

    if (status === 'any') {
        return todosForUser;
    }

    return todosForUser.filter(
        (todo: Todo): boolean => todo.complete === (status === 'completed')
    );
}

// Private, for strongest typing, only export `getUserOrThrow`
function getUser (id: string): ?User {
    return usersById.get(id);
}

export function getUsers (): [User] {
    const res = [...usersById.values()];
    console.log('res', res);
    return res;
}

export function getUserOrThrow (id: string): User {
    const user = getUser(id);

    if (!user) {
        throw new Error(`Invariant exception, User ${id} not found`);
    }

    return user;
}

export function markAllTodosForUser (userId: string, complete: boolean): $ReadOnlyArray<string> {
    const todosToChange = getTodosForUser(userId).filter(
        (todo: Todo): boolean => todo.complete !== complete
    );

    todosToChange.forEach((todo: Todo): void =>
        changeTodoStatus(todo.id, complete)
    );

    return todosToChange.map((todo: Todo): string => todo.id);
}

export function removeTodo (id: string) {
    const todo = getTodoOrThrow(id);
    const userId = todo.userId;
    const todoIdsForUser = getTodoIdsForUser(userId);

    // Remove from the users list
    todoIdsByUser.set(
        userId,
        todoIdsForUser.filter((todoId: string): boolean => todoId !== id)
    );

    // And also from the total list of Todos
    todosById.delete(id);
}

export function removeCompletedTodosForUser (userId: string): $ReadOnlyArray<string> {
    const todoIdsForUser = getTodoIdsForUser(userId);

    const todoIdsToRemove = getTodosForUser(userId)
        .filter((todo: Todo): boolean => todo.complete)
        .map((todo: Todo): string => todo.id);

    // Remove from the users list
    todoIdsByUser.set(
        userId,
        todoIdsForUser.filter(
            (todoId: string): boolean => !todoIdsToRemove.includes(todoId)
        )
    );

    // And also from the total list of Todos
    todoIdsToRemove.forEach((id: string): boolean => todosById.delete(id));

    return todoIdsToRemove;
}

export function renameTodo (id: string, text: string) {
    const todo = getTodoOrThrow(id);

    // Replace with the modified text value
    todosById.set(id, new Todo(id, text, todo.complete));
}
