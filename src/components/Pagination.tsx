"use client";
import { useTodos } from "@/app/context/dataContext";
import React, { useEffect, useState } from "react";

const Pagination = (): React.JSX.Element => {
  const {
    todoList,
    setCurrentPage,
    setCurrentTodos,
    currentPage,
    currentTodos,
    fetchTodos,
  } = useTodos();

  // max data yang akan di tampilkan
  const todosPerPage = 10;
  // jumlah halaman
  const sumPage = Math.ceil(todoList.length / todosPerPage);

  const setTodosCurrent = (page?: number) => {
    const currentTodos = todoList.slice(
      (page - 1) * todosPerPage,
      page * todosPerPage
    );
    setCurrentTodos(currentTodos);
  };

  const handleChangePage = (num: number) => {
    if (num < 1 || num > sumPage) return;
    setCurrentPage(num);
    setTodosCurrent(num);
  };

  const NumPagination = ({ num }) => {
    const element = [];
    for (let i = 1; i <= num; i++) {
      if (currentPage !== i) {
        element.push(
          <button
            onClick={() => handleChangePage(i)}
            key={i}
            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-zinc-600 focus:z-20 focus:outline-offset-0 md:inline-flex">
            {i}
          </button>
        );
      } else {
        element.push(
          <button
            onClick={() => handleChangePage(i)}
            key={i}
            className={`relative bg-indigo-600 z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
            {i}
          </button>
        );
      }
    }
    return element;
  };

  const completed = fetchTodos().filter((a: any) => a.status == true).length;
  useEffect(() => {
    setTodosCurrent(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);
  return (
    <>
      <div className="flex my-10 items-center justify-between border-t border-gray-200 bg-zinc-950  px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-stone-950 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">
            Previous
          </button>
          <div className="flex items-center flex-col gap-2 text-sm">
            <div className="">completed: {completed}</div>
            <div className="">pending: {fetchTodos().length - completed}</div>
          </div>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-stone-950 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white">
              Showing
              <span className="font-medium mx-1">
                {currentPage == 1 ? 1 : (currentPage - 1) * todosPerPage}
              </span>
              to
              <span className="font-medium mx-1">
                {currentPage == 1
                  ? currentTodos.length
                  : currentTodos.length + (currentPage - 1) * todosPerPage}
              </span>
              of
              <span className="font-medium mx-1">{todoList.length}</span>
              results
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <div className="">completed: {completed}</div>
            <div className="">pending: {fetchTodos().length - completed}</div>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination">
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* num pagination */}
              <NumPagination num={sumPage} />

              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>

              <button
                onClick={() => handleChangePage(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-zinc-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
