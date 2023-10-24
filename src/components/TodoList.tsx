import {  useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoComponent } from './TodoComponent';


export const TodoList = () => {
  const { todos } = useContext(TodoContext);
    
  return (
    <section className="todoapp__main">
      {todos?.map((todo) => (
        <TodoComponent key={todo.todoId} todo={todo} />
      ))}
    </section>
  );
};
