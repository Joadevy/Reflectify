import api from "../../api/thought";
import ThoughtItem from "../../components/ThoughtItem";
import useThought from "../../hooks/useThought";
import { useUserContext } from "../../hooks/useUser";
import InputFormItem from "../../components/InputFormItem";

interface thoughtForm extends HTMLFormElement {
  thought: HTMLInputElement;
}

function Home() {
  const { user } = useUserContext();
  const { thoughts, setThoughts, handleLike } = useThought();

  const handleSubmit = async (event: React.FormEvent<thoughtForm>) => {
    event.preventDefault();
    const inputThought = event.currentTarget.thought.value.trim();

    if (!inputThought) return;
    event.currentTarget.thought.value = "";

    const thought = {
      id: crypto.randomUUID(),
      description: inputThought,
      country: user?.country || "Unknown",
      username: user?.username || "Anonymous",
      date: new Date(),
      likes: [],
    };

    const { ok } = await api.saveThought(thought);
    if (!ok) return;

    setThoughts([thought, ...thoughts]);
  };

  return (
    <main className="min-h-screen relative">
      <div className="text-center pt-5">
        <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-400">
          Together, we're Reflectify
        </h1>

        <p className="italic">
          {user?.username ? (
            <span>
              Hi {user.username}, share your reflection or thought with the
              world!
            </span>
          ) : (
            "Share your reflection or thought with the world!"
          )}
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

        <button
          type="submit"
          className="bg-purple-800 border border-purple-400 rounded-md p-2 hover:opacity-80 transition-opacity"
        >
          Share
        </button>
      </form>

      {thoughts.length > 0 && (
        <ul className="flex flex-col gap-5 p-4 mt-1 max-w-sm lg:max-w-md m-auto pb-10">
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

export default Home;
