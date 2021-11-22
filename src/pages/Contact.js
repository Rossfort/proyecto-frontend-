import React from 'react';
import {useFormik, Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';
import axios from 'axios';

const Contact = () => {
  const handleSubmit = (values) => {
    axios.post(process.env.REACT_APP_BASE_API_URL +
      `/api/contacts`, values);
  };
  return (
    <>
      <div className="row">
        <div className="col" style={{textAlign: 'center'}}>
          <h1>Contacto</h1>
        </div>
      </div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          message: '',
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className='row'>
            <div className="col">
              <label
                className="form-label"
                htmlFor="name"
                required>
            Nombre
              </label>
              <Field
                className="form-control"
                type="text"
                id='name'
                name='name'
              />
              <label
                className="form-label"
                htmlFor="phone">
            Telefono
              </label>
              <Field
                className="form-control"
                type="text"
                id='phone' name='phone'
              />
              <label
                className="form-label"
                htmlFor="email">
            Email
              </label>
              <Field
                className="form-control"
                type="email"
                id='email'
                name='email'
              />
            </div>
            <div className="col">
              <label htmlFor="message">Mensaje</label>
              <Field
                as='textarea'
                className='form-control'
                id="message"
                name="message"
                cols="30"
                rows="10"
                maxLength="300"
              >
              </Field>
            </div>
            <button className='btn btn-primary' type='submit'>Enviar</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Contact;
