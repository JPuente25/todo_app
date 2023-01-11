import React from 'react';
import { useLocalStorage } from '../useLocalStorage'; 
import { TodoCounter } from '../../components/HomePage/TodoCounter';
import { TodoSearch } from '../../components/HomePage/TodoSearch';
import { CreateTodoButton } from '../../components/HomePage/CreateTodoButton';
import { TodoList } from '../../components/HomePage/TodoList';
import { TodoHeader } from '../../components/HomePage/TodoHeader';
import { TodoError } from '../../components/HomePage/TodoError';
import { ChangeAlert } from '../../components/HomePage/ChangeAlert';
import { useNavigate, useParams } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
   const {
      todos, 
      setTodos, 
      loading,
      error,
   } = useLocalStorage('TODOS_V1', []);

   const [searchValue, setSearchValue] = React.useState('');

   const { query } = useParams();
   const navigate = useNavigate();

   if(query && (query !== searchValue)) setSearchValue(query)
   else if (!query && (searchValue !== '')) setSearchValue('');


   const completedTodos = todos.filter((todo) => todo.completed).length;
   const totalTodos = todos.length;

   const goHome = () => {
      navigate('/');
      window.location.reload();
   }

   return (
      <React.Fragment>
         <h1 
            onClick={goHome}
            className='app-title'
         >Your Task</h1>

         <TodoHeader loading={loading}>
               <TodoCounter 
                  totalTodos={totalTodos}
                  completedTodos={completedTodos}/>
               <TodoSearch 
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}/>
         </TodoHeader>

         <TodoList 
            loading={loading}
            error={error}
            searchValue={searchValue}
            todos={todos}
            setTodos={setTodos} />

         <CreateTodoButton route={'/new'} />

         <ChangeAlert />
      </React.Fragment>
   )
}
