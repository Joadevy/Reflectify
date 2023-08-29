import type { Thought } from "../types";

export type response = {
  ok?: boolean;
  data?: Thought;
  status: number;
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
      return {
        status: 500,
        message: "Error saving thought: " + error,
        ok: false,
      };
    }
  },
  getThoughts: async (): Promise<response> => {
    try {
      const resp: response = await fetch("/api").then((res) => res.json());
      return resp;
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        ok: false,
        message: "Error getting thoughts: " + error,
      };
    }
  },
  likeThought: async (id: string): Promise<response> => {
    try {
      const resp: response["message"] = await fetch(`/api/${id}/like`, {
        method: "PUT",
      }).then((res) => res.json());
      return {
        message: resp,
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error liking thought: " + error,
      };
    }
  },
  dislikeThought: async (id: string): Promise<response> => {
    try {
      const resp: response["message"] = await fetch(`/api/${id}/dislike`, {
        method: "PUT",
      }).then((res) => res.json());
      return {
        message: resp,
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error liking thought: " + error,
      };
    }
  },
};

export default api;
