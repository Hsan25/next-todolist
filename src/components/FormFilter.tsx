"use client";
import { useTodos } from "@/app/context/dataContext";
import React, { useState } from "react";

const FormFilter = ({ setMessage }): React.JSX.Element => {
  const [value, setValue] = useState<string>("");
  const { setTodoList, todoList, fetchTodos, setCurrentPage } = useTodos();
  const handleChange = (e: any) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
    if (!e.target.value) return;
  };

  const handleSearch = (val?: string) => {
    if (!val || !value) return setTodoList(fetchTodos());
    const todos: any = fetchTodos();
    const newTodos: any = todos.filter((todo: any) =>
      todo.name.includes(val || value)
    );
    setTodoList(newTodos);
    setCurrentPage(1);
    if (!newTodos.length) return setMessage(`no result for ${val || value}`);
  };

  const handleSelect = (e: any) => {
    const type: any = e?.target.value;
    const todos = fetchTodos();
    let result: any;
    setCurrentPage(1);
    switch (type) {
      case "completed":
        result = todos.filter((a: any) => a.status == true);
        if (!result.length) return;
        setTodoList(result);
        break;
      case "pending":
        result = todos.filter((a: any) => a.status == false);
        if (!result.length) return;
        setTodoList(result);
        break;
      case "name":
        result = todos.sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setTodoList(result);
        break;
      case "time":
        result = todos.sort((a: any, b: any) => {
          if (a.createAt < b.createAt) return -1;
          if (a.createAt > b.createAt) return 1;
          return 0;
        });
        setTodoList(result);
        break;
      default:
        setTodoList(fetchTodos());
    }
  };
  return (
    <div
      id="form-filter"
      className="flex w-full mx-auto justify-center items-center gap-8 py-6 flex-col">
      <div className="flex gap-2">
        <input
          type="text"
          onChange={handleChange}
          value={value}
          placeholder="search todo..."
          className="bg-slate-800 p-2 rounded-sm"
        />
        <button
          onClick={() => handleSearch()}
          className="p-2 rounded-sm hover:bg-violet-700 bg-violet-600">
          Search
        </button>
      </div>
      <div className="ml-auto flex gap-2">
        <div className="text-lg">Short By</div>
        <select
          onChange={handleSelect}
          name="filter"
          id="filter"
          className="p-2  bg-slate-700">
          <option value="default">default</option>
          <option value="completed">completed</option>
          <option value="pending">pending</option>
          <option value="time">create times</option>
          <option value="name">name</option>
        </select>
      </div>
    </div>
  );
};

export default FormFilter;
