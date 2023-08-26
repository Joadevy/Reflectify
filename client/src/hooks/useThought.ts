import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  const handleLike = async (id: string, add: boolean) => {
    const response = add
      ? await api.likeThought(id)
      : await api.dislikeThought(id);
    if (response.status === 200) {
      const updatedThoughts = thoughts.map((thought) => {
        if (thought.id === id) {
          return {
            ...thought,
            likes: thought.likes + (add ? 1 : -1),
          };
        }
        return thought;
      });
      setThoughts(updatedThoughts);
    }
  };

  useEffect(() => {
    const fetchThoughts = async () => {
      const response = await api.getThoughts();
      setThoughts(response);
    };

    fetchThoughts();
  }, []);

  return { thoughts, setThoughts, handleLike };
};

export default useThought;
