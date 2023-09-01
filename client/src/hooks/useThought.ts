import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api, { response } from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  // username deberia venir de la sesion, estar en un contexto o algo asi
  const handleLike = async (
    reflectionId: string,
    add: boolean,
    username: string,
  ) => {
    const response = add
      ? await api.likeThought(reflectionId, username)
      : await api.dislikeThought(reflectionId, username);

    if (response.ok) {
      const updatedThoughts = thoughts.map((thought) => {
        if (thought.id === reflectionId) {
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
