import { createContext } from 'react';

interface Todo {
  id: number;
  checked: boolean;
  text: string;
}

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodosContext = createContext<TodosContextType>({
    todos: [],
    setTodos: () => {},
} );

