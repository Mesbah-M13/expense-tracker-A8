import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTodosFilterByCompletedQuery } from "../features/api/apiSlice";
import { updateColors, updateStatus } from "../features/filters/filtersSlice";

const Footer = () => {
  const {
    data: incompletedTodos,
    isLoading,
    isError,
    error,
  } = useGetTodosFilterByCompletedQuery({ completed: false });

  const { status, colors } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const handleUpdateStatus = (status) => {
    dispatch(updateStatus(status));
  };

  const handleUpdateColors = (color) => {
    if (colors.includes(color)) {
      dispatch(updateColors({ color, updateType: "removed" }));
    } else {
      dispatch(updateColors({ color, updateType: "added" }));
    }
  };

  // calculate todos left
  let todosLeft;

  if (isLoading) {
    todosLeft = <div className="text-slate-600">Loading...</div>;
  }

  if (!isLoading && isError) {
    todosLeft = <div className="text-red-600">{error}</div>;
  }

  if (!isError && !isLoading && incompletedTodos?.length === 0) {
    todosLeft = <div className="text-slate-600">No task left</div>;
  }

  if (!isError && !isLoading && incompletedTodos?.length > 0) {
    todosLeft = (
      <div className="text-slate-600">{incompletedTodos?.length} task left</div>
    );
  }

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      {todosLeft}

      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "all" && "font-bold"}`}
          onClick={() => handleUpdateStatus("all")}
        >
          All
        </li>

        <li>|</li>

        <li
          className={`cursor-pointer ${status === "incomplete" && "font-bold"}`}
          onClick={() => handleUpdateStatus("incomplete")}
        >
          Incomplete
        </li>

        <li>|</li>

        <li
          className={`cursor-pointer ${status === "complete" && "font-bold"}`}
          onClick={() => handleUpdateStatus("complete")}
        >
          Complete
        </li>

        <li></li>

        <li></li>

        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleUpdateColors("green")}
        ></li>

        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleUpdateColors("red")}
        ></li>

        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleUpdateColors("yellow")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
