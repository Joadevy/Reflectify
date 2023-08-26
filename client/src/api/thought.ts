import type { Thought } from "../types";

type response = {
  message: string;
};

const api = {
  saveThought: async (thought: Thought): Promise<response> => {
    try {
      const resp: response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      }).then((res) => res.json());

      return resp;
    } catch (error) {
      console.error(error);
      return {
        message: "Error saving thought: " + error,
      };
    }
  },
  getThoughts: async (): Promise<Thought[]> => {
    try {
      const resp: Thought[] = await fetch("/api").then((res) => res.json());
      return resp;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default api;
