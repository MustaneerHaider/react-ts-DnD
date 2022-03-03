import type { FC } from 'react';
import TodoForm from './components/TodoForm';
import styles from './App.module.css';
import { useSelector } from 'react-redux';
import {
	selectCompletedTodos,
	selectUncompletedTodos
} from './store/todoSlice';
import TodoList from './components/TodoList';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
	const completedTodos = useSelector(selectCompletedTodos);
	const uncompletedTodos = useSelector(selectUncompletedTodos);

	return (
		<div className={styles.app}>
			<TodoForm />
			<TodoList type='uncompleted' todos={uncompletedTodos} />
			<TodoList type='completed' todos={completedTodos} />
		</div>
	);
};

export default App;
