import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../types/types';
import { RootState } from './store';

interface TodoState {
	todos: Todo[];
}

const initialState: TodoState = {
	todos: []
};

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<Todo>) {
			state.todos.push(action.payload);
		},
		moveTodo(
			state,
			{ payload }: PayloadAction<{ id: string; status: TodoStatus }>
		) {
			const todo = state.todos.find(todo => todo.id === payload.id);
			if (todo && todo.status !== payload.status) {
				todo.status = payload.status;
			}
		}
	}
});

// actions
export const { addTodo, moveTodo } = todoSlice.actions;

// selectors
export const selectCompletedTodos = (state: RootState) =>
	state.todo.todos.filter(todo => todo.status === TodoStatus.Completed);

export const selectUncompletedTodos = (state: RootState) =>
	state.todo.todos.filter(todo => todo.status === TodoStatus.Uncompleted);

export default todoSlice.reducer;
