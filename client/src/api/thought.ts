import { getBackendURL } from "../helpers/utils";
import type { Thought, UserClientSide } from "../types";

export type response = {
  ok: boolean;
  data?: Thought;
  message?: string;
};

// backend url
const baseUrl = getBackendURL();

const api = {
  saveThought: async (thought: Thought): Promise<response> => {
    try {
      const userData: UserClientSide = JSON.parse(
        sessionStorage.getItem("user")!,
      );
      const resp: response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
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
      const userData: UserClientSide = JSON.parse(
        sessionStorage.getItem("user")!,
      );
      const resp: response = await fetch(`${baseUrl}`, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      }).then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return await res.json();
      });
      return resp;
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Error getting thoughts: " + error,
      };
    }
  },
  getThoughtByPageAndLimit: async (
    page: number,
    limit: number = 7,
  ): Promise<response> => {
    try {
      const userData: UserClientSide = JSON.parse(
        sessionStorage.getItem("user")!,
      );
      const resp: response = await fetch(`${baseUrl}/${page}/${limit}`, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      }).then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return await res.json();
      });
      return resp;
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Error getting thoughts: " + error,
      };
    }
  },
  likeThought: async (reflectionId: string): Promise<response> => {
    try {
      const userData: UserClientSide = JSON.parse(
        sessionStorage.getItem("user")!,
      );
      const resp: response = await fetch(`${baseUrl}/${reflectionId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: JSON.stringify({ username: userData.username }),
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
  dislikeThought: async (reflectionId: string): Promise<response> => {
    try {
      const userData: UserClientSide = JSON.parse(
        sessionStorage.getItem("user")!,
      );
      const resp: response = await fetch(`${baseUrl}/${reflectionId}/dislike`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: JSON.stringify({ username: userData.username }),
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
