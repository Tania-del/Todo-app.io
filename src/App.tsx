import React, { useContext } from 'react';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoContext } from './context/TodoContext';
import { clsx } from 'clsx';


export const App: React.FC = () => {
  const {
    toggled,
    setToggle,
    total,
    handleFilter,
    filter,
    isAnyCompleted,
    clearCompleted,
    todos,
    errorMessage,
  } = useContext(TodoContext);
 
  
  return (
    <div className='todoapp'>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={clsx('todoapp__toggle-all',
              toggled ? 'active' : '')}
            onClick={() => {

              setToggle((prev) => !prev)
            }}
          />
          
          {/* Add a todo on form submit */}
          <NewTodo />
        </header>
        {toggled  &&  <TodoList />}
       

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && 
        <footer className="todoapp__footer">
          <span className="todo-count">{`${total}  items left`}</span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              onClick={() => handleFilter('all')}
              className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
            >
              All
            </a>

            <a
              href="#/active"
                onClick={() => handleFilter('active')}
              className={`filter__link ${
                filter === 'active' ? 'selected' : ''
              }`}
            >
              Active
            </a>
          
            <a
              href="#/completed"
              onClick={() => handleFilter('completed')}
              className={`filter__link ${
                filter === 'completed' ? 'selected' : ''
              }`}
            >
              Completed
            </a>
          </nav>
          <button
            type="button"
            disabled={!isAnyCompleted}
            className="todoapp__clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </footer>
        }
      </div>

      {errorMessage  && 
        <div style={{ margin: '20px', color: 'red', fontSize: '20px' }}>{errorMessage}</div>
      }
    </div>
    
  );
};
