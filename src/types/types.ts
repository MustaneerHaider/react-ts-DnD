export enum TodoStatus {
	Completed,
	Uncompleted
}

export interface Todo {
	id: string;
	text: string;
	status: TodoStatus;
}
