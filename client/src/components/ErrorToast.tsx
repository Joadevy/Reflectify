import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  message: string;
};

function ErrorToast({ message }: Props) {
  const notify = () => {
    toast.error(message, {
      position: "bottom-right",
      icon: "🚫",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    notify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default ErrorToast;
