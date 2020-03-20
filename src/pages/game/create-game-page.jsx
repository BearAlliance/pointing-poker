import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import { TextInput } from '../../inputs/text-input';
import { Redirect } from 'react-router-dom';

export default function CreateGamePage() {
  const [isDone, setIsDone] = useState(false);
  const [hasError, setHasError] = useState(false);

  function handleSubmit(values, { setSubmitting }) {
    setHasError(false);
    fetch(`/api/game/create/${values.firstName}`, { method: 'POST' })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(() => {
        setIsDone(true);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (isDone) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="hero">
        <div className="hero-body">
          <h1 className="title">Create a new game</h1>
        </div>
      </div>

      {hasError && (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setHasError(false)}></button>
          Something went wrong. Try again.
        </div>
      )}

      <div className="columns">
        <div className="column is-one-third">
          <Formik
            initialValues={{ firstName: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required')
            })}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="firstName" label="Name" />
                <ErrorMessage name="firstName" component="div" />

                <button className={classNames('button', 'is-success', { 'is-loading': isSubmitting })} type="submit">
                  Go!
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
