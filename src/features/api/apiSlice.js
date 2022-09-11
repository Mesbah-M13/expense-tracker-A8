import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://json-api-fake-server-new.herokuapp.com/",
  }),

  tagTypes: ["Todos", "Todo", "CompletedTodos"],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => {
        return {
          url: "todos",
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => ["Todos"],
    }),

    getTodosFilterByCompleted: builder.query({
      query: ({ completed }) => {
        return {
          url: `todos?completed=${completed}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => ["CompletedTodos"],
    }),

    getTodo: builder.query({
      query: ({ id }) => {
        return {
          url: `/todos/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),

    postTodo: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/todos`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => ["Todos", "CompletedTodos"],
    }),

    updateTodo: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/todos/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        "Todos",
        "CompletedTodos",
        { type: "Todo", id: arg.id },
      ],
    }),

    deleteTodo: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        "Todos",
        "CompletedTodos",
        { type: "Todo", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodosFilterByCompletedQuery,
  useGetTodoQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
