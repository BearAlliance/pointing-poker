import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../inputs/text-with-button';

export function AddPlayer({ id, onSubmit, type }) {
  function handleSubmit(values, { setSubmitting, setFieldError }) {
    const playerId = values.firstName;

    fetch(`/api/${type}/${id}/${playerId}/available`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        if (res.available) {
          onSubmit(playerId, values.isGuest);
        } else {
          setFieldError('firstName', 'Name already taken, try another');
          setSubmitting(false);
        }
      })
      .catch(err => {
        setFieldError('firstName', 'Error joining, try again');
        setSubmitting(false);
      });
  }

  return (
    <div data-testid="add-player">
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
            <ErrorMessage name="firstName">
              {msg => (
                <div data-testid="join-error" className="has-text-danger">
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
}
