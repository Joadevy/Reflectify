import { useState } from "react";
import { Thought } from "../types";

type Props = {
  thought: Thought;
  handleLike: (thoughtId: string, add: boolean) => void;
};

const ThoughtItem = ({ thought, handleLike }: Props) => {
  const [liked, setLiked] = useState(false);

  const toggleLikeThought = (thoughtId: string) => {
    const like = !liked;
    handleLike(thoughtId, like);
    setLiked(like);
  };

  return (
    <li className="border border-purple-400 rounded-md p-2">
      <header>
        <p>
          ✦ <span className="font-bold">{thought.username}</span> reflected:
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

      <div className="flex gap-1 items-center mt-1 text-gray-400 text-sm">
        <button
          className="w-5 h-5 hover:opacity-75 transition-opacity"
          onClick={() => {
            toggleLikeThought(thought.id);
          }}
        >
          <img src="./public/celebrate.png" alt="celebrate" />
        </button>
        <p>{thought.likes}</p>
      </div>
    </li>
  );
};

export default ThoughtItem;
