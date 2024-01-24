"use client";
import FormFilter from "@/components/FormFilter";
import Pagination from "@/components/Pagination";
import React from "react";
import { useState } from "react";
import { useTodos } from "./context/dataContext";
import TableList from "@/components/TableList";
import AddTodoForm from "@/components/AddTodoForm";
const Page = () => {
  const { fetchTodos } = useTodos();
  const todos = fetchTodos();
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="container px-4 sm:px-0 xl:px-10 mx-auto py-4">
        <h1 className="text-2xl text-center font-semibold">Todo List</h1>
        {/* list todo */}

        <div className="list mx-auto w-full my-12">
          {/* form add todo */}
          <AddTodoForm />

          {/* checking todolist */}
          {!todos?.length ? (
            <>
              <h1 className="text-center text-lg">TODOLIST NOTFOUND</h1>
            </>
          ) : (
            <>
              <FormFilter setMessage={setMessage} />
              {/* table todo list */}
              <TableList message={message} />
              {/* pagination todo list */}
              <Pagination />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Page;
