import { useEffect, useState } from "react";
import UserForm, { type User } from "./components/UserForm";

type response = {
  message: string;
};

interface thoughtForm extends HTMLFormElement {
  thought: HTMLInputElement;
}

type Thought = {
  id: number;
  username: string;
  country: string;
  description: string;
  date: Date;
};

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("user") || "{}");
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<thoughtForm>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.thought.value.trim();

    if (!inputValue) return;

    const thought = {
      id: new Date().getTime(),
      description: inputValue,
      country: user?.country || "Unknown",
      username: user?.name || "Anonymous",
      date: new Date(),
    };

    setThoughts([...thoughts, thought]);
    event.currentTarget.thought.value = "";

    try {
      const resp: response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      }).then((res) => res.json());

      console.log(resp.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (!localStorage.getItem("user")) {
    return <UserForm setUser={setUser} />;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-5">Reflectify</h1>
        <p className="italic">
          {user?.name
            ? `Hi ${user.name}, share your reflection or thought with the world!`
            : "Share your reflection or thought with the world!"}
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 p-4 max-w-sm m-auto"
      >
        <label htmlFor="thoughtInput">
          <input
            name="thought"
            id="thoughtInput"
            type="text"
            placeholder="Share a reflexion..."
            className="border border-purple-400 rounded-md p-2"
          />
        </label>

        <button type="submit" className=" bg-purple-600 rounded-md p-2 ">
          Share
        </button>
      </form>

      {thoughts.length > 0 && (
        <ul className="flex flex-col gap-2 p-4 mt-5  max-w-sm m-auto">
          {thoughts.map((thought) => (
            <li
              key={thought.id}
              className="border border-purple-400 rounded-md p-2"
            >
              <header>
                <p>
                  ✦ <span className="font-bold">{thought.username}</span>{" "}
                  reflected:
                </p>
              </header>
              <p className=" bg-slate-700 shadow border border-transparent p-2 rounded-md mt-1">
                {thought.description}
              </p>

              <footer className="flex justify-around items-center mt-1">
                <p className="italic text-gray-400 text-sm">
                  from {thought.country}
                </p>

                <p className="italic text-sm text-gray-400">
                  at {thought.date.toLocaleTimeString()},{" "}
                  {thought.date.toLocaleDateString()}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
