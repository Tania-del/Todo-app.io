import {
  useContext, useState, useRef
} from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

type TodoType = {
  todo: Todo;
};

export const TodoComponent: React.FC<TodoType> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    handleCompleted,
    deleteTodo,
    setTodos,
  } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleDoubleInput = (value: string) => {
    setIsEditing(true);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }, 5)
  };
  

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    updateTodo(e.target.value)

    setIsEditing(false)
    console.log('here is fucking blur');
    
  }

  const updateTodo = (value: string) => {
      if (value && value !== todo.title) {
            setTodos((prev) => prev.map((item) => item.todoId === todo.todoId ? ({
              ...item,
              title: value,
            }) : item))
          }  
}

  return (
    <div className={`todo ${todo?.completed ? 'completed' : ''}`}>
      <label
        className="todo__status-label"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCompleted(todo?.todoId);
          }
        }}
      >
        <input type="checkbox" className="todo__status" />
      </label>

      {isEditing ? (
        <form onSubmit={async(e) => {
          e.preventDefault()
          const instanseForm = new FormData(e.target as HTMLFormElement) 
          const inputValue = instanseForm.get('todoTitle')

          updateTodo(inputValue as string)
          setIsEditing(false)
        }}>
          <input
            className="todo__title-field"
            type="text"
            name="todoTitle"
            id='aditable_input'
            placeholder="Empty todo will be deleted"
            autoFocus
            onBlur={handleBlur}
            ref={inputRef}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
          <span className="todo__title"
            onDoubleClick={() => handleDoubleInput(todo.title)}
          onClick={() => console.log('click on span')}
          >
          {todo?.title}
        </span>
      )}

      {!isEditing && (
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteTodo(todo?.todoId);
          }}
          type="button"
          className="todo__remove"
        >
          ×
        </button>
      )}
    </div>
  );
};
