import { createContext, ReactNode, useState } from 'react';
import { Todo } from '../types/Todo';
import { TSetValue, useLocaleStorage } from '../hooks/useLocaleStorage';

interface ITodoContext {
  todos: Todo[],
  toggled: boolean;
  setToggle: TSetValue<boolean>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  deleteTodo: (id: Todo['todoId']) => void;
  total: number;
  handleCompleted:  (id: Todo['todoId']) => void
  handleFilter: (type: FilterType) => Todo[];
  filter: FilterType;
  isAnyCompleted: boolean;
  clearCompleted: () => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  setTodos: () => {},
  deleteTodo: async () => {},
  total: 0,
  handleCompleted: () => {},
  handleFilter: () => [],
  filter: 'all',
  isAnyCompleted: false,
  clearCompleted: () => {},
  toggled: false,
  setToggle: () => { },
  errorMessage: '',
  setErrorMessage: () => '',
});

type FilterType = 'all' | 'completed' | 'active';

export const handleActions = (values: Todo[], type: FilterType) => {
  const actions: Record<FilterType, Todo[]> = {
    active: values.filter((todo) => todo.completed === false),
    all: values,
    completed: values.filter((todo) => todo.completed),
  };

  return actions[type];
};


export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', [])
  const [toggled, setToggle] = useLocaleStorage('toggle', true);
  const [filter, setFilter] = useState<FilterType>('all');  
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const deleteTodo = (id: Todo['todoId']) => {
    setTodos((todos) => todos.filter((item) => item?.todoId !== id))
  }

  const handleCompleted = (id: Todo['todoId']) => {
    setTodos((todos) => todos.map((todo) => ({
      ...todo,
      completed: todo.todoId === id ? !todo.completed : todo.completed,
    })))    
  }


  const handleFilter = (type: FilterType) => {
    setFilter(type);
    const filteredByType = handleActions(todos, type);

    return filteredByType;
  };

  const clearCompleted = () => {
    setTodos((todos) => todos.filter((todo) => !todo.completed))
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        toggled, 
        setToggle,
        deleteTodo,
        total: todos.filter((item) => !item.completed).length,
        handleCompleted,
        handleFilter,
        filter,
        isAnyCompleted: todos.some((item) => item.completed),
        clearCompleted,
        setErrorMessage,
        errorMessage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

