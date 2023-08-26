import { useEffect, useState } from "react";
import type { Thought } from "../types";
import api from "../api/thought";

const useThought = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      const response = await api.getThoughts();
      setThoughts(response);
    };

    fetchThoughts();
  }, []);

  return { thoughts, setThoughts };
};

export default useThought;
