import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../inputs/text-with-button';
import { GravatarInput } from '../inputs/gravatar-input';
import { getHashFromEmail, getRandomHash } from './gravatar';

export function AddPlayer({ id, onSubmit, type }) {
  function handleSubmit(values, { setSubmitting, setFieldError }) {
    const { name, email } = values;

    // Default to random if they don't enter anything
    const emailHash = email !== '' ? getHashFromEmail(email) : getRandomHash();

    fetch(`/api/${type}/${id}/${name}/available`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        if (res.available) {
          onSubmit({ playerId: name, emailHash });
        } else {
          setFieldError('name', 'Name already taken, try another');
          setSubmitting(false);
        }
      })
      .catch(err => {
        setFieldError('name', 'Error joining, try again');
        setSubmitting(false);
      });
  }

  return (
    <div data-testid="add-player">
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <TextInputWithButton name="name" label="Name" buttonLabel="Join" loading={isSubmitting} />
            <ErrorMessage name="name">
              {msg => (
                <div data-testid="join-error" className="has-text-danger">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <GravatarInput name="email" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
