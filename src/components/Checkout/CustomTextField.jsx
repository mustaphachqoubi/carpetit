import React from "react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

const CustomTextField = ({ name, required, label, placeholder }) => {
  const { control } = useFormContext();

  const [value, setValue] = useState();

  const handleInput = (e) => setValue(e.target.value);

  return (
    <div>
      <Controller
        render={({ field }) => (
          <input
            onChange={handleInput}
            type={name === 'email' ? 'email' : name === 'zip' ? 'number' : 'text'}
            {...field}
            className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            required
            placeholder={placeholder}
            value={value}
          />
        )}
        name={name}
        control={control}
        label={label}
        required={required}
      />
    </div>
  );
};

export default CustomTextField;
