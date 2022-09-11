import React, { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import editImage from "../assets/images/edit-round.svg";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../features/api/apiSlice";
import Modal from "./Modal";

const Todo = ({ todo }) => {
  const { id, text, completed, color } = todo;
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} todo={todo} />}

      <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
        <div
          className={`relative cursor-pointer rounded-full bg-white border-2 ${
            completed ? "border-green-500" : "border-gray-400"
          } w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2`}
        >
          <input
            type="checkbox"
            className="opacity-0 absolute rounded-full cursor-pointer"
            onChange={() => updateTodo({ id, data: { completed: !completed } })}
          />

          {completed && (
            <svg
              className="fill-current w-3 h-3 text-green-500 pointer-events-none"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>

        <div className={`select-none flex-1 ${completed && "line-through"}`}>
          {text}
        </div>

        <div
          className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
            color === "green" && "bg-green-500"
          }`}
          onClick={() => updateTodo({ id, data: { color: "green" } })}
        ></div>

        <div
          className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
            color === "yellow" && "bg-yellow-500"
          }`}
          onClick={() => updateTodo({ id, data: { color: "yellow" } })}
        ></div>

        <div
          className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
            color === "red" && "bg-red-500"
          }`}
          onClick={() => updateTodo({ id, data: { color: "red" } })}
        ></div>

        <img
          src={editImage}
          className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
          alt="Edit"
          onClick={() => setShowModal(true)}
        />

        <img
          src={cancelImage}
          className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
          alt="Cancel"
          onClick={() => deleteTodo({ id })}
        />
      </div>
    </>
  );
};

export default Todo;
