import { FC, DragEvent } from 'react';
import { Todo as TodoProps } from '../types/types';
import styles from './Todo.module.css';

const Todo: FC<TodoProps> = ({ text, id }) => {
	const dragStartHandler = (event: DragEvent<HTMLLIElement>) => {
		event.dataTransfer.setData('text/plain', id);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<li
			draggable='true'
			className={styles.todo}
			onDragStart={dragStartHandler}
		>
			<h3>{text}</h3>
		</li>
	);
};

export default Todo;
