import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';

export function AddPlayer({ gameId, joinGame }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [gameId]);

  function handleSubmit(values, { setSubmitting }) {
    setHasError(false);
    joinGame(values.firstName, gameId, data => {
      if (data.error) {
        // TODO add error handling on server responses / client socket
        console.log('Erorr back from addFn', data);
        setSubmitting(false);
        setHasError(true);
      }
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
  );
}
