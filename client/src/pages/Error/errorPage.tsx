import { useRouteError } from "react-router-dom";

type error = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  const error = useRouteError() as error;

  console.error(error);

  return (
    <div id="error-page" className="grid place-content-center  min-h-screen">
      <h1 className=" text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
