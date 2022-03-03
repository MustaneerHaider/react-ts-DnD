import { FC, useState, FormEvent } from 'react';
import styles from './TodoForm.module.css';
import { TextInput, Button } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addTodo } from '../store/todoSlice';
import { TodoStatus } from '../types/types';

interface TodoFormProps {}

const TodoForm: FC<TodoFormProps> = () => {
	const [input, setInput] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			addTodo({
				id: Math.random().toString(),
				text: input,
				status: TodoStatus.Uncompleted
			})
		);
		setInput('');
	};

	return (
		<form onSubmit={submitHandler} className={styles.todoForm}>
			<TextInput
				placeholder='Add your new todo...'
				size='md'
				value={input}
				onChange={event => setInput(event.target.value)}
			/>
			<Button type='submit'>Add Todo</Button>
		</form>
	);
};

export default TodoForm;
