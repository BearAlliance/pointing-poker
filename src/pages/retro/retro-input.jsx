import React from 'react';
import * as Yup from 'yup';
import classNames from 'classnames';
import { ErrorMessage, Form, Formik } from 'formik';
import { TextArea } from '../../inputs/textarea';

export function RetroInput({ onClose, onSubmit }) {
  function handleSubmit(values) {
    onSubmit(values.retroItem);
  }

  return (
    <div className="notification">
      <button className="delete" onClick={onClose} />
      <Formik
        validateOnBlur={false}
        initialValues={{ retroItem: '' }}
        validationSchema={Yup.object({
          retroItem: Yup.string()
            .max(400, 'Must be less than 400 characters')
            .required('Required')
        })}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <TextArea name="retroItem" minHeight={100} />
            <ErrorMessage name="retroItem">{msg => <div className="has-text-danger">{msg}</div>}</ErrorMessage>
            <div className="has-text-right">
              <button className={classNames('button', 'is-success', { loading: isSubmitting })} type="submit">
                <span className="icon is-small">
                  <i className="fas fa-check" />
                </span>
                <span>Save</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
