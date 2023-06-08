import { useState } from 'react';
import './App.scss';
import ColorBox from './components/color-box';
import TodoList from './components/todo-list';

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

  return (
    <div className="app">
      <h1>React Hooks - Todo List</h1>
      <div>
        <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      </div>
    </div>
  );
}

export default App;
