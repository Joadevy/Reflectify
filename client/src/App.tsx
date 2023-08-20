import { useState } from "react";

type response = {
  message: string;
};

function App() {
  const [message, setMessage] = useState<string>("");

  const handleFetch = async () => {
    const response: Promise<response> = fetch("/api").then((res) => res.json());
    const data = await response;
    setMessage(data.message);
  };

  return (
    <>
      <div>Hello {message}</div>
      <button onClick={handleFetch} className="border border-red-600 p-4 mt-2">
        Request backend c:
      </button>
    </>
  );
}

export default App;
