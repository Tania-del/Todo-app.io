import { createTodo } from '../helpers/createTodo';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';


export const NewTodo = () => {
  const { setTodos, todos } = useContext(TodoContext)

  
  const handleTitle = (title: string) => {
    setTodos(prev => [...prev, createTodo(title)])
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formInstance = new FormData(e.target as HTMLFormElement); 
        const todoTitle = (formInstance.get('title') ?? '') as string;
        
        const getTitle = todos.map((todo) => todo.title)
  
        if (todoTitle && !getTitle.includes(todoTitle)) {
          (e.target as HTMLFormElement).reset()
          handleTitle(todoTitle);
        }
      }}
    >
      <input
        name='title'
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
