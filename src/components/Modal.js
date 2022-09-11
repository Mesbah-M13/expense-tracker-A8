import React, { useState } from "react";
import { useUpdateTodoMutation } from "../features/api/apiSlice";

const Modal = ({ todo, setShowModal }) => {
  const { id, text, completed, color } = todo;
  const [todoId, setTodoId] = useState(id);
  const [todoText, setTodoText] = useState(text);
  const [todoCompleted, setTodoCompleted] = useState(completed);
  const [todoColor, setTodoColor] = useState(color);

  const [updateTodo] = useUpdateTodoMutation();

  const handleUpdateTodo = () => {
    updateTodo({
      id,
      data: {
        id: todoId,
        text: todoText,
        completed: todoCompleted,
        color: todoColor,
      },
    });
    setShowModal(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="id"
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                      Id
                    </label>
                    <input
                      type="number"
                      id="id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={id}
                      value={todoId}
                      onChange={(e) => {
                        setTodoId(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={text}
                      value={todoText}
                      onChange={(e) => setTodoText(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="color"
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      id="color"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={color}
                      value={todoColor}
                      onChange={(e) => setTodoColor(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="completed"
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                      Completed
                    </label>
                    <input
                      type="text"
                      id="completed"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={completed ? "true" : "false"}
                      value={todoCompleted}
                      onChange={(e) => setTodoCompleted(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleUpdateTodo}
              >
                Update
              </button>

              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
