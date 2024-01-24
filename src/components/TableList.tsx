"use client";
import { useTodos } from "@/app/context/dataContext";
import React from "react";
const TableList = ({ message }) => {
  const { currentTodos, currentPage, saveTodos, fetchTodos, todoList } =
    useTodos();
  // parse date to MMDDYY
  const parseDate = (time: number) => {
    let result: string = "";
    const date = new Date(time);
    result += `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    return result;
  };

  // delete todolist
  const deleteTodo = (idx: number) => {
    const newTodo = fetchTodos().slice();
    newTodo.splice(idx, 1);
    saveTodos(newTodo);
  };

  // change status to completed todo.
  const completedTodo = (idx: number) => {
    const newTodo: any = fetchTodos().map((todo: any, index: number) => {
      if (idx == index) {
        todo.status = true;
        todo.completedAt = Date.now();
      }
      return todo;
    });
    saveTodos(newTodo);
  };
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="table-auto min-w-[800px] w-full ">
          <thead className="">
            <tr>
              <th className="text-base p-5">No</th>
              <th className="text-base p-5">name</th>
              <th className="text-base p-5">status</th>
              <th className="text-base p-5">Create at</th>
              <th className="text-base p-5">Completed at</th>
              <th className="text-base p-5">action</th>
            </tr>
          </thead>
          <tbody className="">
            {currentTodos.map((todo: any, idx: number) => {
              return (
                <tr key={idx} className="">
                  <td className="py-4 text-center">
                    {currentPage == 1
                      ? idx + 1
                      : idx + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="py-4 truncate max-w-28">{todo.name}</td>
                  <td className="py-4">
                    {todo.status ? (
                      <div className="bg-green-600 p-1 text-base w-max mx-auto rounded">
                        Completed
                      </div>
                    ) : (
                      <div className="bg-yellow-600 p-1 text-base w-max mx-auto rounded">
                        Pending
                      </div>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {parseDate(todo.createAt)}
                  </td>
                  <td className="py-4 text-center">
                    {todo.completedAt ? parseDate(todo.completedAt) : "-"}
                  </td>
                  <td className="py-4 mx-auto flex">
                    <button
                      onClick={() =>
                        deleteTodo(
                          currentPage == 1 ? idx : idx + (currentPage - 1) * 10
                        )
                      }
                      className="p-1 mr-2 text-base bg-red-600 hover:bg-red-700 rounded">
                      DELETE
                    </button>
                    <button
                      onClick={
                        !todo.status
                          ? () =>
                              completedTodo(
                                currentPage == 1
                                  ? idx
                                  : idx + (currentPage - 1) * 10
                              )
                          : null
                      }
                      className={`${
                        todo.status
                          ? "bg-green-700 cursor-default"
                          : "bg-green-600"
                      } p-1 text-base  hover:bg-green-700 rounded`}>
                      COMPLETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!todoList.length ? (
          <h1 className="text-center my-10 text-lg">{message}</h1>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TableList;
