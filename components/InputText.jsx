import { useField } from "formik";

export const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{meta.error}</p>
        </div>
      ) : null}
    </>
  );
};
