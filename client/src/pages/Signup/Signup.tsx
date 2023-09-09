import { useEffect, useState } from "react";
import api from "../../api/user";
import { isEmpty } from "../../helpers/utils";
import { useUserContext } from "../../hooks/useUser";
import { User, UserClientSide } from "../../types";
import InputFormItem from "./InputFormItem";
import { Link, Form, useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";
import InputFormCountry from "./InputFormCountry";

interface SignUpForm extends HTMLFormElement {
  username: HTMLInputElement;
  country: HTMLInputElement;
  password: HTMLInputElement;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [error, setError] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isEmpty(user)) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (invalidData) {
      setTimeout(() => {
        setInvalidData(false);
      }, 3000);
    }

    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [invalidData, error]);

  const handleSubmit = async (event: React.FormEvent<SignUpForm>) => {
    if (loading) return;

    setLoading(true);
    event.preventDefault();
    const username = capitalize(event.currentTarget.username.value.trim());
    const country = capitalize(event.currentTarget.country.value.trim());
    const pwd = event.currentTarget.password.value.trim();

    if (!username || !country || !pwd) {
      setInvalidData(true);
      setLoading(false);
      return;
    }

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
      const response = await api.registerUser(userToDB);
      const accessToken = response?.data?.token;
      if (accessToken) {
        clientUser.accessToken = accessToken;
        sessionStorage.setItem("user", JSON.stringify(clientUser));
        setUser(clientUser);
        navigate("/");
      } else {
        setInvalidData(true);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="text-center pt-5">
        <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-800 via-purple-600 to-pink-400">
          Together, we're Reflectify
        </h1>
        <p className="italic">
          Register and share your reflection or thought with the world!
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

        <InputFormCountry
          htmlFor="inputCountry"
          name="country"
          placeholder="Type your country ..."
          setDisabled={setDisabled}
          label="Country"
        />

        <button
          type="submit"
          className=" bg-purple-600 rounded-md p-2 mt-2 + disabled:bg-gray-700"
          disabled={disabled}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </Form>

      <div>
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600">
            Log In
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-1 left-0 right-0 m-auto">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date(Date.now()).getFullYear()} Reflectify
        </p>
      </footer>

      {error && <ErrorToast message="Something went wrong! Please Try Again" />}
      {invalidData && (
        <ErrorToast message="Invalid username, password or country. Please Try Again" />
      )}
    </div>
  );
}

export default SignUp;
