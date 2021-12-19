import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import useCategories from '../../hooks/useCategories';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import {useFormik} from 'formik';

const CategoriesNew = () => {
  const [loading, setLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const {createCategory} = useCategories();
  const [message, setMessage] = React.useState(undefined);
  const [messageStatus, setMessageStatus] = React.useState('none');


  const handleClose = (e) => {
    setMessageStatus('none');
  };

  const fform = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('category[name]', values.name);
      createCategory(formData)
          .then(() => {
            setMessage('Categoria editada con exito');
            setMessageStatus('block');
            setSubmitStatus('success');
          })
          .catch(() => {
            setMessage('Categoria editada con exito');
            setMessageStatus('block');
            setSubmitStatus('error');
          });
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Campo requerido';
      }
      return errors;
    },
  });


  return (
    <>
      <ContentHeader
        title={'Categorias'}
      />
      <div className="admin-content-wrapper">
        <div
          className="alert alert-success mt-3 alert-dismissible fade show"
          role="alert"
          style={{display: `${messageStatus}`}}
        >
          <span
            style={{color: 'gray'}}
          >
            {message}
          </span>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
        <div className="row">
          <div className="col">
          </div>
          <div className="col-8">
            <form onSubmit={fform.handleSubmit}>
              <label
                htmlFor="name"
                className='form-label'
              >
            Nombre de la categoria.
              </label>
              <input
                type="text"
                name='name'
                id='name'
                onChange={fform.handleChange}
                value={fform.values.name}
                className='form-control mb-4'
              />
              {fform.errors.name && <div
                className='text-danger'>{fform.errors.name}</div>}
              <input type="submit" className='btn btn-primary mx-auto mt-4'/>
            </form>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesNew;
