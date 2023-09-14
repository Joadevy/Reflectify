import api from "../../api/user";
import { useUserContext } from "../../hooks/useUser";
import { User, UserClientSide } from "../../types";
import { Link, Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "../../helpers/utils";
import ErrorToast from "../../components/ErrorToast";
import InputFormItem from "../../components/InputFormItem";
import Header from "../../components/Header";

interface LoginForm extends HTMLFormElement {
  username: HTMLInputElement;
  country: HTMLInputElement;
  password: HTMLInputElement;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function Login() {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (invalidCredentials) {
      setTimeout(() => {
        setInvalidCredentials(false);
      }, 4000);
    }
  }, [invalidCredentials]);

  useEffect(() => {
    if (!isEmpty(user)) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event: React.FormEvent<LoginForm>) => {
    event.preventDefault();
    setLoading(true);
    const username = capitalize(event.currentTarget.username.value.trim());
    const pwd = event.currentTarget.password.value.trim();

    if (!username || !pwd) {
      setInvalidCredentials(true);
      setLoading(false);
      return;
    }

    const userToDB: Pick<User, "username" | "password"> = {
      username,
      password: pwd,
    };

    const clientUser: UserClientSide = {
      username,
      country: "",
      accessToken: "",
    };

    try {
      const responseLogin = await api.loginUser(userToDB);
      const accessToken = responseLogin?.data?.token;
      const country = responseLogin?.data?.user?.country;
      if (accessToken) {
        clientUser.accessToken = accessToken;
        clientUser.country = country ?? "";
        sessionStorage.setItem("user", JSON.stringify(clientUser));
        setUser(clientUser);
        navigate("/");
      } else {
        setInvalidCredentials(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header>
        Log in to share your reflection or thought with the world!
      </Header>
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

        <button
          type="submit"
          className=" bg-purple-600 rounded-md p-2 mt-2 "
          disabled={loading}
        >
          {loading ? "..." : "Log In"}
        </button>
      </Form>

      <div>
        <p className="text-center text-gray-400 text-sm">
          You do not have an account?{" "}
          <Link to="/register" className="text-purple-600">
            Sign Up
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-1 left-0 right-0 m-auto">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date(Date.now()).getFullYear()} Reflectify
        </p>
      </footer>
      {invalidCredentials && (
        <ErrorToast message="Invalid username or password" />
      )}
    </div>
  );
}

export default Login;
