import React from 'react';
import style from './Comment.module.scss';
import Button from './Button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface Props {
  onSubmit: (comment: string) => void;
}

const Comment: React.FC<Props> = ({ onSubmit }) => {

  return (
    <div className={style.comment}>
      <Formik
        initialValues={{ comment: "" }}
        validationSchema={Yup.object({
          comment: Yup.string().required().min(1).max(249)
        })}
        onSubmit={(values, actions) => {
          onSubmit(values.comment);
          actions.resetForm();
        }}
      >
        <Form className='uk-form-stacked uk-width-1-1'>
          <div className='uk-margin'>
            <ErrorMessage
              className='uk-form-controls'
              name="comment"
              render={(msg) => (<div className='uk-text-danger'>{msg}</div>)}
            />
          </div>
          <div className='uk-margin'>
            <Field as="textarea" className='uk-textarea uk-width-1-1'
              type="text"
              placeholder="new comment ..."
              name="comment"
              autoComplete="off"
            />
          </div>
          <div className='uk-margin'>
            <div className="uk-grid-medium uk-flex-middle uk-grid" uk-grid="true">
              <div className="uk-width-auto">
                <Button primary rounded type="submit">Submit</Button>
              </div>
              <div className="uk-width-expand">
                <Button secondary rounded type="reset">Reset</Button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>

  );
}

export default Comment;