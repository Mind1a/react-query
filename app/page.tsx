'use client';

import { useQuery, useMutation, useIsFetching } from '@tanstack/react-query';

type Todo = {
  userId?: number;
  id: number;
  title?: string;
  completed?: boolean;
};

export default function Home() {
  const {
    data: todosData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Todo>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),

    select: (todos) =>
      todos.map((todo: any) => ({ id: todo.id, title: todo.title })),
  });

  const { data: usersData } = useQuery<any>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div>
      {isSuccess && (
        <div>
          <h1>Users List</h1>
          <ul>
            {usersData?.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h1>Todo List</h1>
        <ul>
          {todosData?.map((todo: Todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
