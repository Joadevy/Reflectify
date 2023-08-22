import { useState } from "react";

type response = {
  message: string;
};

interface TodoForm extends HTMLFormElement {
  todo: HTMLInputElement;
}

type Todo = {
  id: number;
  description: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = async (event: React.FormEvent<TodoForm>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.todo.value.trim();

    if (!inputValue) return;

    const todo = {
      id: new Date().getTime(),
      description: inputValue,
    };

    setTodos([...todos, todo]);
    event.currentTarget.todo.value = "";

    try {
      const resp: response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }).then((res) => res.json());

      console.log(resp.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold mt-5">
        To-do but with backend server!
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 p-4 max-w-sm m-auto"
      >
        <label htmlFor="todoInput">
          <input
            name="todo"
            id="todoInput"
            type="text"
            placeholder="Create new todo..."
            className="border border-purple-400 rounded-md p-2"
          />
        </label>

        <button type="submit" className=" bg-purple-600 rounded-md p-2 ">
          Create
        </button>
      </form>

      {todos.length > 0 && (
        <ul className="flex flex-col gap-2 p-4 mt-5  max-w-sm m-auto">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border border-purple-400 rounded-md p-2"
            >
              {todo.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
