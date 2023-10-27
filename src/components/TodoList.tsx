import {  useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoComponent } from './TodoComponent';


export const TodoList = () => {
  const { handleFilter, filter } = useContext(TodoContext);

  return (
    <section className="todoapp__main">
      {handleFilter(filter).map((todo) => (
        <TodoComponent key={todo.todoId} todo={todo} />
      ))}
    </section>
  );
};
