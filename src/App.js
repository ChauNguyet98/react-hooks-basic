import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.scss';
import ColorBox from './components/color-box';
import TodoList from './components/todo-list';
import TodoForm from './components/todo-form';
import PostList from './components/post-list';
import Pagination from './components/pagination';
import PostFilterForm from './components/post-filter-form';
import Clock from './components/clock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love frontend!' },
    { id: 2, title: 'We love frontend!' },
    { id: 3, title: 'They love frontend!' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    title_like: '',
  });

  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJson = await response.json();

        const { data, pagination } = responseJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail to fetch post list: ', error.message);
      }
    };

    console.log('Effect post list');
    fetchPostList();
  }, [filters]);

  useEffect(() => {
    console.log('Effect todo list');
  });

  const handleFiltersChange = (formValues) => {
    setFilters({
      ...filters,
      _page: 1,
      title_like: formValues.searchTerm,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

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
        {showClock && <Clock />}
        <button
          onClick={() => {
            setShowClock(false);
          }}
        >
          Hide clock
        </button>
      </div>

      <div>{/* <TodoForm onSubmit={handleSubmitForm} /> */}</div>

      <div>
        {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
        {/* <PostFilterForm onSubmit={handleFiltersChange} />
        <PostList posts={postList} />
        <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      </div>
    </div>
  );
}

export default App;
