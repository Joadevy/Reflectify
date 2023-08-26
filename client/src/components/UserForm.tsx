interface TodoForm extends HTMLFormElement {
  todo: HTMLInputElement;
}

export type User = {
  id: number;
  name: string;
  country: string;
};

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function UserForm({ setUser }: Props) {
  const handleSubmit = async (event: React.FormEvent<TodoForm>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value.trim();
    const country = event.currentTarget.country.value.trim();

    if (!username || !country) return;

    const user: User = {
      id: new Date().getTime(),
      name: capitalize(username),
      country: capitalize(country),
    };

    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      event.currentTarget.username.value = "";
      event.currentTarget.country.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-5">Reflectify</h1>
        <p className="italic">
          Share your reflection or thought with the world!
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 max-w-sm m-auto"
      >
        <label htmlFor="inputName" className="flex flex-col gap-1">
          Name
          <input
            name="username"
            id="inputName"
            type="text"
            placeholder="Type your name ..."
            className="border border-purple-400 rounded-md p-2"
          />
        </label>

        <label htmlFor="inputCountry" className="flex flex-col gap-1">
          Country
          <input
            name="country"
            id="inputCountry"
            type="text"
            placeholder="Type your country ..."
            className="border border-purple-400 rounded-md p-2"
          />
        </label>

        <button type="submit" className=" bg-purple-600 rounded-md p-2 mt-2 ">
          Continue
        </button>
      </form>
    </>
  );
}

export default UserForm;
