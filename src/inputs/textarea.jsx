import React from 'react';
import { useField } from 'formik';

export function TextArea({ label, name, minHeight }) {
  const [field] = useField(name);

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="control">
        <textarea
          style={{ minHeight: minHeight }}
          name={name}
          className="input"
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </div>
    </div>
  );
}
