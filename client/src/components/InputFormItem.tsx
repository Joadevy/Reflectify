type Props = {
  htmlFor: string;
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
};

const InputFormItem = ({ htmlFor, name, placeholder, type, label }: Props) => {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1">
      <p className="text-sm text-gray-400">{label}</p>
      <input
        name={name}
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        className="border border-purple-400 rounded-md p-2 outline-none"
      />
    </label>
  );
};

export default InputFormItem;
