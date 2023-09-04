import api from "../../api/user";
import useUser from "../../hooks/useUser";
import { User, UserClientSide } from "../../types";
import InputFormItem from "../SignIn/InputFormItem";
import { Link, Form, useNavigate } from "react-router-dom";

interface LoginForm extends HTMLFormElement {
  username: HTMLInputElement;
  country: HTMLInputElement;
  password: HTMLInputElement;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function Login() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) {
    navigate("/");
  }

  const handleSubmit = async (event: React.FormEvent<LoginForm>) => {
    event.preventDefault();
    const username = capitalize(event.currentTarget.username.value.trim());
    const country = capitalize(event.currentTarget.country.value.trim());
    const pwd = event.currentTarget.password.value.trim();

    if (!username || !country || !pwd) return;

    const userToDB: User = {
      username,
      country,
      password: pwd,
    };

    const clientUser: UserClientSide = {
      username,
      country,
      accessToken: "",
    };

    try {
      await api.registerUser(userToDB);
      const responseLogin = await api.loginUser(userToDB);
      const accessToken = responseLogin?.data?.token;
      if (accessToken) {
        sessionStorage.setItem("accesToken", accessToken);
        clientUser.accessToken = accessToken;
      }
      sessionStorage.setItem("user", JSON.stringify(clientUser));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-center pt-5">
        <h1 className="text-4xl font-bold">Reflectify</h1>
        <p className="italic">
          Share your reflection or thought with the world!
        </p>
      </div>
      <Form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 max-w-sm m-auto"
      >
        <InputFormItem
          htmlFor="inputName"
          name="username"
          placeholder="Type your name ..."
          label="Name"
        />

        <InputFormItem
          htmlFor="inputPwd"
          name="password"
          placeholder="Type your password ..."
          label="Password"
          type="password"
        />

        <InputFormItem
          htmlFor="inputCountry"
          name="country"
          placeholder="Type your country ..."
          label="Country"
        />

        <button type="submit" className=" bg-purple-600 rounded-md p-2 mt-2 ">
          Sign In
        </button>
      </Form>

      <div>
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600">
            Login
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-1 left-0 right-0 m-auto">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date(Date.now()).getFullYear()} Reflectify
        </p>
      </footer>
    </div>
  );
}

export default Login;
