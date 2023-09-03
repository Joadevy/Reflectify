import type { User } from "../types";

export type response = {
  ok: boolean;
  message: string;
  data?: User;
};

export type loginResponse = {
  ok: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
};

// backend url
const baseUrl = "http://localhost:5000";

const api = {
  registerUser: async (user: User): Promise<response> => {
    try {
      const resp: response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());

      return resp;
    } catch (error) {
      return {
        ok: false,
        message: error as string,
      };
    }
  },
  loginUser: async (
    user: Pick<User, "username" | "password">,
  ): Promise<loginResponse> => {
    try {
      const resp: loginResponse = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());

      return resp;
    } catch (error) {
      return {
        ok: false,
        message: error as string,
      };
    }
  },
};

export default api;
