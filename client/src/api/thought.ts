import type { Thought } from "../types";

export type response = {
  ok: boolean;
  data?: Thought;
  message?: string;
};

// backend url
const baseUrl = "http://localhost:5000";

const api = {
  saveThought: async (thought: Thought): Promise<response> => {
    try {
      const resp: response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      }).then((res) => res.json());

      return resp;
    } catch (error) {
      return {
        ok: false,
        message: "Error saving thought: " + error,
      };
    }
  },
  getThoughts: async (): Promise<response> => {
    try {
      const resp: response = await fetch(`${baseUrl}`).then((res) =>
        res.json(),
      );
      return resp;
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Error getting thoughts: " + error,
      };
    }
  },
  likeThought: async (
    reflectionId: string,
    username: string,
  ): Promise<response> => {
    try {
      const resp: response = await fetch(`${baseUrl}/${reflectionId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }).then((res) => res.json());
      return resp;
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Error liking thought: " + error,
      };
    }
  },
  dislikeThought: async (
    reflectionId: string,
    username: string,
  ): Promise<response> => {
    try {
      const resp: response = await fetch(`${baseUrl}/${reflectionId}/dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }).then((res) => res.json());
      return resp;
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Error disliking thought: " + error,
      };
    }
  },
};

export default api;
