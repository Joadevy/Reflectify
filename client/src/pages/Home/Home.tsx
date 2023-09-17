import ThoughtItem from "../../components/ThoughtItem";
import useThought from "../../hooks/useThought";
import { useUserContext } from "../../hooks/useUser";
import InputFormItem from "../../components/InputFormItem";
import Header from "../../components/Header";
import api from "../../api/thought";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface thoughtForm extends HTMLFormElement {
  thought: HTMLInputElement;
}

function Home() {
  const lastReflectionRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(lastReflectionRef, {});

  const { user } = useUserContext();
  const {
    thoughts,
    handleLike,
    loading,
    addPage,
    refreshThoughts,
    isLastPage,
  } = useThought();

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

    await refreshThoughts();
  };

  useEffect(() => {
    const isVisible = entry?.isIntersecting;

    if (isVisible) addPage();
  }, [entry?.isIntersecting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen relative">
      <Header>
        {user?.username ? (
          <span>
            Hi {user.username}, share your reflection or thought with the world!
          </span>
        ) : (
          "Share your reflection or thought with the world!"
        )}
      </Header>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 p-4 max-w-sm lg:max-w-md m-auto"
      >
        <div className="w-full">
          <InputFormItem
            htmlFor="thoughtInput"
            name="thought"
            placeholder="Share a reflexion..."
          />
        </div>

        <button
          type="submit"
          className="bg-purple-800 border border-purple-400 rounded-md p-2 hover:opacity-80 transition-opacity"
        >
          Share
        </button>
      </form>

      {thoughts.length > 0 && (
        <>
          <ul
            className={
              "flex flex-col gap-5 px-4 mt-1 max-w-sm lg:max-w-md m-auto "
            }
          >
            {thoughts.map((thought, index) => (
              <div
                ref={index === thoughts.length - 2 ? lastReflectionRef : null}
                key={thought.id}
              >
                <ThoughtItem thought={thought} handleLike={handleLike} />
              </div>
            ))}
          </ul>

          {isLastPage && (
            <div className="flex flex-col gap-5 p-4 mt-1 max-w-sm lg:max-w-md m-auto pb-14">
              <p className="text-center text-gray-500 text-sm italic">
                No more reflections
              </p>
            </div>
          )}

          {/* {!isLastPage && (
            <div className="flex flex-col gap-5 p-4 mt-1 max-w-sm lg:max-w-md m-auto pb-14">
              <button
                className="bg-purple-800 border border-purple-400 rounded-md p-2 hover:opacity-80 transition-opacity"
                onClick={addPage}
                disabled={loading}
              >
                Load more
              </button>
            </div>
          )} */}
        </>
      )}

      {loading && (
        <div className="flex flex-col gap-5 p-4 mt-1 max-w-sm lg:max-w-md m-auto pb-10">
          <p className="text-center text-gray-500 text-sm italic">
            Loading reflections...
          </p>
        </div>
      )}

      {!loading && thoughts.length === 0 && (
        <div className="flex flex-col gap-5 p-4 mt-1 max-w-sm lg:max-w-md m-auto pb-10">
          <p className="text-center text-gray-500 text-sm italic">
            No reflections yet, be the first to share one!
          </p>
        </div>
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
