import React from 'react';
import { useField } from 'formik';

export function TextInput({ name, label }) {
  const [field] = useField(name);

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="control">
        <input
          name={name}
          className="input"
          type="text"
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </div>
    </div>
  );
}
