import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api, { response } from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // username deberia venir de la sesion, estar en un contexto o algo asi
  const handleLike = async (reflectionId: string, add: boolean) => {
    const response = add
      ? await api.likeThought(reflectionId)
      : await api.dislikeThought(reflectionId);

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
    setLoading(true);
    const fetchThoughts = async () => {
      const response: response = await api.getThoughts().finally(() => {
        setLoading(false);
      });
      setThoughts((response?.data ?? []) as Thought[]);
    };

    fetchThoughts();
  }, []);

  return { thoughts, setThoughts, handleLike, loading };
};

export default useThought;
