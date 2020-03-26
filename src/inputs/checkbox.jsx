import React from 'react';

import { useField } from 'formik';

export function Checkbox({ name, label }) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" value={field.value} onChange={() => helpers.setValue(!field.value)} />
          {label}
        </label>
      </div>
    </div>
  );
}
