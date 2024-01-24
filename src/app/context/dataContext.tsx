"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
interface TodoContextObj {
  currentPage: number;
  totalPage: null | number;
  currentTodos: any;
  todoList?: any;
  setCurrentTodos?: Dispatch<SetStateAction<number>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  setTotalPage?: Dispatch<SetStateAction<number>>;
  setTodoList?: Dispatch<SetStateAction<number>>;
  saveTodos?: (data: any) => void;
  fetchTodos?: () => any;
}

const TodoContext = createContext<TodoContextObj>({
  currentPage: 1,
  totalPage: null,
  currentTodos: [],
  todoList: [],
});

const TodoContextProvider = ({ children }) => {
  const [currentTodos, setCurrentTodos] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todoList, setTodoList] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  const saveTodos = (data: any): void => {
    localStorage.setItem("todos", JSON.stringify(data));
    setTodoList(data);
  };
  const fetchTodos = (): any => {
    if (typeof window !== "undefined") {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      return todos;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setTodoList(fetchTodos());
  }, []);

  return (
    <TodoContext.Provider
      value={{
        saveTodos,
        fetchTodos,
        currentTodos,
        currentPage,
        totalPage,
        todoList,
        setTodoList,
        setCurrentTodos,
        setCurrentPage,
        setTotalPage,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
export default TodoContextProvider;
