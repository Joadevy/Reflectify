import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api, { response } from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [publishing, setPublishing] = useState(false);

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

  const handleDelete = async (reflectionId: string) => {
    const response = await api.deleteThought(reflectionId);
    if (response.ok) {
      const updatedThoughts = thoughts.filter(
        (thought) => thought.id !== reflectionId,
      );
      setThoughts(updatedThoughts);
    }
  };

  const addPage = async () => {
    setPage(page + 1);
  };

  const handleNewThought = async (newThought: Thought) => {
    setPublishing(true);
    try {
      const { ok } = await api.saveThought(newThought);
      if (!ok) throw new Error("Error saving thought");

      await refreshThoughts();
    } catch (error) {
      console.log(error);
    } finally {
      setPublishing(false);
    }
  };

  const refreshThoughts = async () => {
    const response: response = await api.getThoughtByPageAndLimit(page);
    const newThoughts = response?.data ?? [];
    setThoughts(newThoughts as Thought[]);
  };

  const handlePage = async (page: number) => {
    setLoading(true);
    const response: response = await api
      .getThoughtByPageAndLimit(page)
      .finally(() => {
        setLoading(false);
      });
    const newThoughts = thoughts.concat(response?.data ?? []);
    setThoughts(newThoughts as Thought[]);

    if (response.info && response.info.isLastPage) {
      setIsLastPage(true);
    }
  };

  useEffect(() => {
    handlePage(page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    thoughts,
    setThoughts,
    handleLike,
    loading,
    publishing,
    addPage,
    handleDelete,
    handleNewThought,
    isLastPage,
  };
};

export default useThought;
