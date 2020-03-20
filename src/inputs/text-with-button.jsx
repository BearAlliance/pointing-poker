import React, { Fragment } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

export function TextInputWithButton({ name, label, buttonLabel, onButtonClick, loading, placeholder }) {
  const [field] = useField(name);

  return (
    <Fragment>
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      <div className="field has-addons">
        <div className="control">
          <input
            placeholder={placeholder}
            name={name}
            className="input"
            type="text"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-info', { 'is-loading': loading })}
            onClick={onButtonClick}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
