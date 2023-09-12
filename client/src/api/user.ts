import type { User } from "../types";

export type response = {
  ok: boolean;
  message: string;
  data?: User;
};

export type authResponse = {
  ok: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
};

// backend url
const baseUrl = "https://backend-zo2z.onrender.com";

const api = {
  registerUser: async (user: User): Promise<authResponse> => {
    try {
      const resp: authResponse = await fetch(`${baseUrl}/register`, {
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
  ): Promise<authResponse> => {
    try {
      const resp: authResponse = await fetch(`${baseUrl}/login`, {
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
