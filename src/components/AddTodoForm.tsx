"use client";
import { useTodos } from "@/app/context/dataContext";
import React, { useState } from "react";
const AddTodoForm = () => {
  const [value, setValue] = useState<string>("");
  const { saveTodos, fetchTodos } = useTodos();
  // add todolist
  
  const addTodo = (): void => {
    if (!value) return;
    interface TodoTemp {
      name: string;
      status: boolean;
      createAt: number;
      completedAt: null | number;
    }
    const newTodo: TodoTemp = {
      name: value,
      status: false,
      createAt: Date.now(),
      completedAt: null,
    };
    saveTodos([newTodo, ...fetchTodos()]);
    setValue("");
  };
  return (
    <>
      <form id="form-add" className="form flex gap-2 justify-center my-20">
        <input
          type="text"
          value={value}
          required
          placeholder="add todo..."
          maxLength={70}
          onChange={(e) => setValue(e.target.value)}
          className="border-2 p-2 bg-neutral-800"
        />
        <button
          onClick={addTodo}
          type="submit"
          className="p-1  text-base bg-green-600 hover:bg-green-700 rounded-sm">
          ADD TODO
        </button>
      </form>
    </>
  );
};

export default AddTodoForm;
