import React, { Fragment } from 'react';
import { useField } from 'formik';
import { Gravatar } from '../components/gravatar';

export function GravatarInput({ name }) {
  const [field] = useField(name);

  return (
    <Fragment>
      <label htmlFor={name} className="label">
        Gravatar Email (optional)
      </label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            name={name}
            type="text"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </div>
        <div className="control">
          <div className="button">
            <Gravatar email={field.value} size="sm" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
