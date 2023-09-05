import ThoughtItem from "./components/ThoughtItem";
import InputFormItem from "./components/InputFormItem";
import { useUserContext } from "./hooks/useUser";
import api from "./api/thought";
import useThought from "./hooks/useThought";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "./helpers/utils";

interface thoughtForm extends HTMLFormElement {
  thought: HTMLInputElement;
}

function App() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { thoughts, setThoughts, handleLike } = useThought();

  if (isEmpty(user)) {
    navigate("/register");
  }

  const handleSubmit = async (event: React.FormEvent<thoughtForm>) => {
    event.preventDefault();
    const inputThought = event.currentTarget.thought.value.trim();

    if (!inputThought) return;

    const thought = {
      id: crypto.randomUUID(),
      description: inputThought,
      country: user?.country || "Unknown",
      username: user?.username || "Anonymous",
      date: new Date(),
      likes: [],
    };

    setThoughts([thought, ...thoughts]);
    event.currentTarget.thought.value = "";

    await api.saveThought(thought);
  };

  return (
    <main className="min-h-screen relative">
      <div className="text-center pt-5">
        <h1 className="text-4xl font-bold">Reflectify</h1>
        <p className="italic">
          {user?.username
            ? `Hi ${user.username}, share your reflection or thought with the world!`
            : "Share your reflection or thought with the world!"}
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 p-4 max-w-sm m-auto"
      >
        <InputFormItem
          htmlFor="thoughtInput"
          name="thought"
          placeholder="Share a reflexion..."
        />

        <button type="submit" className="bg-purple-600 rounded-md p-2">
          Share
        </button>
      </form>

      {thoughts.length > 0 && (
        <ul className="flex flex-col gap-4 p-4 mt-1 max-w-sm m-auto pb-10">
          {thoughts.map((thought) => (
            <ThoughtItem
              key={thought.id}
              thought={thought}
              handleLike={handleLike}
            />
          ))}
        </ul>
      )}

      <footer className="absolute bottom-0 left-0 right-0 m-auto">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date(Date.now()).getFullYear()} Reflectify
        </p>
      </footer>
    </main>
  );
}

export default App;
