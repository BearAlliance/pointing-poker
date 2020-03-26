import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';

export function AddPlayer({ gameId, joinGame }) {
  function handleSubmit(values, { setSubmitting, setFieldError }) {
    joinGame(values.firstName, gameId, data => {
      if (data.error) {
        setSubmitting(false);
        setFieldError('firstName', data.error);
      }
    });
  }

  return (
    <div>
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
            <ErrorMessage name="firstName">{msg => <div className="has-text-danger">{msg}</div>}</ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
}
