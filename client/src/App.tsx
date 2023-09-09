import { useUserContext } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "./helpers/utils";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (isEmpty(user)) {
      navigate("/register");
    } else {
      setShowHome(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!showHome) return null;
  return <Home />;
}

export default App;
