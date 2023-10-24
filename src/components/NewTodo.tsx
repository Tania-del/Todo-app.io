// import { TodoContext } from '../context/TodoContext';
import { createTodo } from '../helpers/createTodo';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';


export const NewTodo = () => {
  // const { handleAddTodo, setErrorMessage } = useContext(TodoContext);
  const { todos, setTodos } = useContext(TodoContext)

  
  
  const handleTitle = (title: string) => {
    setTodos(prev => [...prev, createTodo(title)])
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formInstance = new FormData(e.target as HTMLFormElement); 
        const todoTitle = (formInstance.get('title') ?? '') as string;
        (e.target as HTMLFormElement).reset()
        handleTitle(todoTitle)
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
