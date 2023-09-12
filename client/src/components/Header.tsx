import { type ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center pt-5 px-4 lg:px-0">
      <h1 className="font-extrabold text-transparent mb-2 sm:mb-0 text-4xl bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-400">
        Together, we're Reflectify
      </h1>
      <p className="italic">{children}</p>
    </div>
  );
};

export default Header;
