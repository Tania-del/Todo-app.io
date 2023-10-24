import uuid from 'uuid-random';
import { Todo } from '../types/Todo';



export const createTodo = (title: string): Todo => {
    const uniqueId = uuid()
    return { title, todoId: uniqueId, completed: false}
} 