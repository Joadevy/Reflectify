import { ReactNode, createContext, useContext, useState } from "react";
import { UserClientSide } from "../types";

const getUserFromStorage = () =>
  JSON.parse(sessionStorage.getItem("user") || "{}");

type UserContextType = {
  user: UserClientSide;
  setUser: React.Dispatch<React.SetStateAction<UserClientSide>>;
};

export const UserContext = createContext<UserContextType>({
  user: { username: "", country: "", accessToken: "" },
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserClientSide>(getUserFromStorage());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context.user) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
