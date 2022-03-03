import { DragEvent, FC, useRef } from 'react';
import { Todo, TodoStatus } from '../types/types';
import styles from './TodoList.module.css';
import TodoItem from './Todo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { moveTodo } from '../store/todoSlice';

interface TodoListProps {
	type: 'completed' | 'uncompleted';
	todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({ type, todos }) => {
	const listRef = useRef<HTMLUListElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	let cssClasses = [styles.todos];
	if (type === 'uncompleted') {
		cssClasses.push(styles.uncompletedTodos);
	}

	const dragOverHandler = (event: DragEvent<HTMLElement>) => {
		if (event.dataTransfer?.types[0] === 'text/plain') {
			event.preventDefault();
			listRef!.current!.classList.add(
				type === 'completed'
					? styles.droppableCompleted
					: styles.droppableUncompleted
			);
		}
	};

	const dropHandler = (event: DragEvent<HTMLElement>) => {
		const todoId = event.dataTransfer.getData('text/plain');
		dispatch(
			moveTodo({
				id: todoId,
				status:
					type === 'completed'
						? TodoStatus.Completed
						: TodoStatus.Uncompleted
			})
		);
	};

	const dragLeaveHandler = (_: DragEvent<HTMLElement>) => {
		listRef!.current!.classList.remove(
			type === 'completed'
				? styles.droppableCompleted
				: styles.droppableUncompleted
		);
	};

	return (
		<section
			className={cssClasses.join(' ')}
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
			onDrop={dropHandler}
		>
			<header>
				<h2>
					{`${
						type === 'completed' ? 'Completed' : 'Uncompleted'
					} Todos`.toUpperCase()}
				</h2>
			</header>
			<ul ref={listRef}>
				{todos.map(todo => (
					<TodoItem
						key={todo.id}
						id={todo.id}
						text={todo.text}
						status={todo.status}
					/>
				))}
			</ul>
		</section>
	);
};

export default TodoList;
