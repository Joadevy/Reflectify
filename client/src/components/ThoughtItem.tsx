import { Thought } from "../types";

type Props = {
  thought: Thought;
};

const ThoughtItem = ({ thought }: Props) => {
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

      <footer className="flex justify-around items-center mt-1">
        <p className="italic text-gray-400 text-sm">from {thought.country}</p>

        <p className="italic text-sm text-gray-400">
          at {new Date(thought.date).toLocaleTimeString()},{" "}
          {new Date(thought.date).toLocaleDateString()}
        </p>
      </footer>
    </li>
  );
};

export default ThoughtItem;
