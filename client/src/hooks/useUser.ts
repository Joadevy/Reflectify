import { useEffect, useState } from "react";
import type { User } from "../types";

const getUserFromStorage = async () =>
  await JSON.parse(localStorage.getItem("user") || "{}");

const isEmpty = <T extends object>(obj: T) => {
  return Object.keys(obj).length === 0;
};

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserFromStorage();
        if (isEmpty(user)) return;
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return { user, setUser };
};

export default useUser;