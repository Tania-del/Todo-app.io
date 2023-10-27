import { createTodo } from '../helpers/createTodo';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';


export const NewTodo = () => {
  const { setTodos, todos, setErrorMessage } = useContext(TodoContext)
  
  const handleTitle = (title: string) => {
    setTodos(prev => [...prev, createTodo(title)])
  };

  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.length) {
      setErrorMessage('')
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formInstance = new FormData(e.target as HTMLFormElement); 
        const todoTitle = (formInstance.get('title') ?? '') as string;
       
        
        const getTitle = todos.map((todo) => todo.title)
    
        if (getTitle.includes(todoTitle)) {
          setErrorMessage('Sorry, but you already have this in your list 👀')
        } else {
          setErrorMessage('')
        }

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
        onChange={(e) => handleError(e)}
      />
    </form>
  );
};
