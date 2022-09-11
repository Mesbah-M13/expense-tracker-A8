import React, { useState } from "react";
import doubleTickImage from "../assets/images/double-tick.png";
import notesImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
} from "../features/api/apiSlice";

const Header = () => {
  const { data: todos } = useGetTodosQuery();
  const [postTodo] = usePostTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [todoTitle, setTodoTitle] = useState("");

  const handlePostTodo = (e) => {
    e.preventDefault();
    postTodo({
      data: {
        text: todoTitle,
        completed: false,
      },
    });
    setTodoTitle("");
  };

  const handleCompleteAllTasks = () => {
    todos.forEach((todo) => {
      updateTodo({
        id: todo.id,
        data: { completed: true },
      });
    });
  };

  const handleClearAllCompletedTasks = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo({ id: todo.id });
      }
    });
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={handlePostTodo}
      >
        <img src={notesImage} className="w-6 h-6" alt="Add todo" />

        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />

        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url(${plusImage})] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={handleCompleteAllTasks}
        >
          <img className="w-4 h-4" src={doubleTickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>

        <li className="cursor-pointer" onClick={handleClearAllCompletedTasks}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
