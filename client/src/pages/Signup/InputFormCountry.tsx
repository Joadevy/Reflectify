import { useEffect, useState } from "react";
import { countrylist } from "./utils";

type Props = {
  htmlFor: string;
  name: string;
  placeholder: string;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  type?: string;
};

const InputFormCountry = ({
  htmlFor,
  name,
  placeholder,
  setDisabled,
  label,
  type,
}: Props) => {
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    setDisabled(!countrylist.some((country) => country === userCountry));
  }, [userCountry]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1">
      <p className="text-sm text-gray-400">{label}</p>
      <input
        name={name}
        id={htmlFor}
        type={type ?? "text"}
        placeholder={placeholder}
        className="border border-purple-400 rounded-md p-2"
        value={userCountry}
        onChange={(e) => setUserCountry(e.target.value)}
        autoComplete="on"
        list="list"
      />
      <datalist id="list">
        {countrylist.map((country) => (
          <option value={country} key={country} />
        ))}
      </datalist>
    </label>
  );
};

export default InputFormCountry;
