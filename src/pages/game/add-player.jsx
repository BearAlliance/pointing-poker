import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextInputWithButton } from '../../inputs/text-with-button';
import { Checkbox } from '../../inputs/checkbox';

export function AddPlayer({ gameId, joinGame }) {
  function handleSubmit(values, { setSubmitting, setFieldError }) {
    joinGame(values.firstName, values.isGuest, gameId, data => {
      if (data.error) {
        setSubmitting(false);
        setFieldError('firstName', data.error);
      }
    });
  }

  return (
    <div>
      <Formik
        initialValues={{ firstName: '', isGuest: false }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required')
        })}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Checkbox name="isGuest" label="Join as guest" />
            <TextInputWithButton name="firstName" label="Name" buttonLabel="Join" loading={isSubmitting} />
            <ErrorMessage name="firstName">{msg => <div className="has-text-danger">{msg}</div>}</ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
}
