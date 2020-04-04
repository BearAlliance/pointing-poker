import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputWithButton } from '../../inputs/text-with-button';
import { withRouter } from 'react-router-dom';

export function _JoinGameButton({ history }) {
  function handleSubmit(values, { setSubmitting }) {
    setSubmitting(false);
    history.push(`/game/${values.gameId}`);
  }

  return (
    <Formik
      initialValues={{ gameId: '' }}
      validationSchema={Yup.object({
        gameId: Yup.string()
          .max(4, 'Must be exactly 4 characters')
          .min(4, 'Must be exactly 4 characters')
          .required('Required')
      })}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <TextInputWithButton name="gameId" placeholder="Game ID" buttonLabel="Join Session" loading={isSubmitting} />
          <ErrorMessage name="gameId" component="div" />
        </Form>
      )}
    </Formik>
  );
}

export const JoinGameButton = withRouter(_JoinGameButton);
