import { useState } from "react";
import { Thought } from "../types";
import { useUserContext } from "../hooks/useUser";

type Props = {
  thought: Thought;
  handleLike: (thoughtId: string, add: boolean) => void;
};

const ThoughtItem = ({ thought, handleLike }: Props) => {
  const { user } = useUserContext();
  const [liked, setLiked] = useState(thought.likes.includes(user.username));
  const isYourThought = user.username === thought.username;

  const toggleLikeThought = (thoughtId: string) => {
    const like = !liked;
    handleLike(thoughtId, like);
    setLiked(like);
  };

  return (
    <li className="border border-purple-400 rounded-md p-2 shadow-[0_0_10px_#8e24aa]">
      <header>
        <p>
          ✦{" "}
          <span
            className={"font-bold " + (isYourThought ? "text-purple-400" : "")}
          >
            {isYourThought ? "You" : thought.username}
          </span>{" "}
          reflected:
        </p>
      </header>
      <p className=" bg-slate-700 shadow border border-transparent p-2 rounded-md mt-1">
        {thought.description}
      </p>

      <footer className="flex justify-between items-center mt-1">
        <p className="italic text-gray-400 text-sm">from {thought.country}</p>

        <p className="italic text-sm text-gray-400">
          at {new Date(thought.date).toLocaleTimeString()},{" "}
          {new Date(thought.date).toLocaleDateString()}
        </p>
      </footer>

      <div
        className={"flex gap-1 items-center mt-1 text-gray-400 text-sm w-fit "}
      >
        <button
          className="w-5 h-5 hover:opacity-75 transition-opacity"
          onClick={() => {
            toggleLikeThought(thought.id);
          }}
        >
          <img src="/celebrate.png" alt="celebrate" />
        </button>
        <p className={liked ? "text-purple-400" : ""}>{thought.likes.length}</p>
      </div>
    </li>
  );
};

export default ThoughtItem;
