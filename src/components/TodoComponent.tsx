import {
  useContext, useState, useRef,
} from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import { useConfirm } from '../hooks/useConfirm';

type TodoType = {
  todo: Todo;
};

export const TodoComponent: React.FC<TodoType> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [Dialog, confirmDelete] = useConfirm(
    'Empty string will be delete from list',
    'Are you sure, you want to delete this?'
  )

  const {
    handleCompleted,
    deleteTodo,
    setTodos,
  } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null)
  const prevTitle = useRef<string>('')
  
  const handleDoubleInput = (value: string) => {
    setIsEditing(true);

    prevTitle.current = value;
        
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

  const handleBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!value) {      
      return handleDelete()
    }
        
    updateTodo(value)
    setIsEditing(false)   
    return;
  }

  const updateTodo = (value: string) => {
      if (value && value !== todo.title) {
            setTodos((prev) => prev.map((item) => item.todoId === todo.todoId ? ({
              ...item,
              title: value,
            }) : item))
          }  
}

  const handleDelete = async () => {
    const answer = await confirmDelete()

    if (answer === true) {
      deleteTodo(todo.todoId)
    } else {
      if (inputRef.current) {
        inputRef.current.value = prevTitle.current;
      }
    }
}
  
  return (
    <>
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

       <Dialog />
        {isEditing ? (
        <form onSubmit={async(e) => {
            e.preventDefault()
            inputRef.current?.blur()
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
        </>
  );
};
