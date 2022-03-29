import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
    
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);
      const [searchValue, setSearchValue] = React.useState('');
      const [openModal, setOpenModal] = React.useState(false);

      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];
    
      if (!searchValue.length >=1){
        searchedTodos = todos;
      } else {
        searchedTodos = todos.filter(todo => {
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return todoText.includes(searchText);
        });
          }
    
        const addTodo = (text) => {
         const newTodos = [...todos];
            newTodos.push({
              completed: false,
              text,
            });
            saveTodos(newTodos);
          };


      const completeTodo = (text) => {
        // todoindex es la posicion del elemento que cumpla la condicion y retorna la posicion encontrada
        const todoIndex = todos.findIndex(todo => todo.text === text);
        // esta linea clona el arreglo todos y lo guarda en newtodos
        const newTodos = [...todos];
        // esta linea completa la tarea (cambia el estado a completado)
        newTodos[todoIndex].completed = true;
        // modifica el arreglo actual donde indica que elemento cambio en el arreglo
        saveTodos(newTodos);
      };
    
      const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
      };
    
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,  
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            addTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}


export { TodoContext, TodoProvider };