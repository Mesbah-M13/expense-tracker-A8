import React from "react";
import { useSelector } from "react-redux";
import {
  useGetTodosFilterByCompletedQuery,
  useGetTodosQuery,
} from "../features/api/apiSlice";
import Todo from "./Todo";

const Todos = () => {
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  const { data: completedTodos } = useGetTodosFilterByCompletedQuery({
    completed: true,
  });
  const { data: incompletedTodos } = useGetTodosFilterByCompletedQuery({
    completed: false,
  });
  const { status, colors } = useSelector((state) => state.filters);

  // decide what to render
  let content;

  if (isLoading) {
    content = <div className="text-slate-600">Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <div className="text-red-600">{error}</div>;
  }

  if (!isError && !isLoading && todos?.length === 0) {
    content = <div className="text-slate-600">No task found!</div>;
  }

  if (!isError && !isLoading && todos?.length > 0) {
    if (status === "all") {
      if (colors.length === 0) {
        content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
      } else {
        content = todos
          .filter((todo) => colors.includes(todo.color))
          .map((todo) => <Todo key={todo.id} todo={todo} />);
      }
    } else if (status === "complete") {
      if (colors.length === 0) {
        content = completedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ));
      } else {
        content = completedTodos
          .filter((todo) => colors.includes(todo.color))
          .map((todo) => <Todo key={todo.id} todo={todo} />);
      }
    } else if (status === "incomplete") {
      if (colors.length === 0) {
        content = incompletedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ));
      } else {
        content = incompletedTodos
          .filter((todo) => colors.includes(todo.color))
          .map((todo) => <Todo key={todo.id} todo={todo} />);
      }
    }
  }

  return <div>{content}</div>;
};

export default Todos;
