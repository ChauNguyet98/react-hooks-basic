import { useState } from 'react';
import './App.scss';
import ColorBox from './components/color-box';
import TodoList from './components/todo-list';
import TodoForm from './components/todo-form';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love frontend!' },
    { id: 2, title: 'We love frontend!' },
    { id: 3, title: 'They love frontend!' },
  ]);

  const handleTodoClick = (todo) => {
    const index = todoList.findIndex((item) => item.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleSubmitForm = (formValues) => {
    const newTodo = {
      ...formValues,
      id: todoList.length + 1,
    };
    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  };

  return (
    <div className="app">
      <h1>React Hooks - Todo List</h1>
      <div>
        <TodoForm onSubmit={handleSubmitForm} />
      </div>
      <div>
        <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      </div>
    </div>
  );
}

export default App;
