import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';

export function AddPlayer({ gameId, onComplete }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [gameId]);

  function handleSubmit(values, { setSubmitting }) {
    setHasError(false);
    fetch(`/api/game/addPlayer/${gameId}/${values.firstName}`, { method: 'POST' })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(() => {
        onComplete(values.firstName);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }
  return (
    <div>
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
                <TextInputWithButton name="firstName" label="Name" buttonLabel="Join" loading={isSubmitting} />
                <ErrorMessage name="firstName" component="div" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
