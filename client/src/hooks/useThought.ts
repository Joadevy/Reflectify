import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api, { response } from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  const handleLike = async (id: string, add: boolean) => {
    const response = add
      ? await api.likeThought(id)
      : await api.dislikeThought(id);

    if (response.ok) {
      const updatedThoughts = thoughts.map((thought) => {
        if (thought.id === id) {
          return {
            ...thought,
            likes: response.data?.likes ?? [],
          };
        }
        return thought;
      });
      setThoughts(updatedThoughts);
    }
  };

  useEffect(() => {
    const fetchThoughts = async () => {
      const response: response = await api.getThoughts();
      setThoughts((response?.data ?? []) as Thought[]);
    };

    fetchThoughts();
  }, []);

  return { thoughts, setThoughts, handleLike };
};

export default useThought;
