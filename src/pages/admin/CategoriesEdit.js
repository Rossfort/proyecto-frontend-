import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import {Link, useLocation, useHistory} from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import {Dropzone, FileItem, FullScreenPreview} from 'dropzone-ui';
import useUrlToFile from '../../hooks/useUrlToFile';
import {useFormik, Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';

const CategoriesEdit = () => {
  const [category, setCategory] = React.useState([]);
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [loading, setLoading] = React.useState(false);
  const {id} = useParams();
  const {adminEdit, updateCategory} = useCategories();
  const [properties, setProperties] = React.useState([]);
  const [initialFormValues, setInitialFormValues] = React.useState({});
  const [message, setMessage] = React.useState(undefined);
  const [messageStatus, setMessageStatus] = React.useState('none')

  React.useEffect(() => {
    adminEdit(id).then((res) => {
      setCategory(res.data.category);
      setProperties(res.data.category.properties);
      setInitialFormValues({name: res.data.category.name});
      initValues(res.data.category);
    });
  }, []);

  const initValues = (category) => {
    const values = {};
    values['category-name'] = category.name;
    values['properties'] = [];
    category.properties.forEach((item) => {
      values['properties'].push({
        propertyName: item.name,
        propertyId: item.id,
      });
    },
    );
    setInitialFormValues(values);
  };

  const handleSubmit = (values) => {
    const fd = new FormData();
    fd.append('category[name]', values['category-name']);
    let property = new Date().getTime();
    values.properties.forEach((item) => {
      property++;
      if (item.propertyId) property = item.propertyId;
      fd.append(`category[properties_attributes][${property}][name]`, item.propertyName);
      fd.append(`category[properties_attributes][${property}][id]`, item.propertyId);
      if (item['_destroy']) {
        fd.append(`category[properties_attributes][${property}][_destroy]`, item['_destroy']);
      }
    });
    updateCategory(id, fd)
        .then(() => {
          setSubmitStatus('success');
          setMessage('Categoria editada con exito');
          setMessageStatus('block')
        })
        .catch(() => {
          setMessage('Hubo un error intentalo mas tarde');
          setMessageStatus('block')
          setSubmitStatus('error');
        },
        );
  };

  const handleClose = (e) => {
    setMessageStatus('none')
  };

  console.log(message, messageStatus)

  return (
    <>
      <ContentHeader
        title={'Categorias'}
        btn='/admin/categories/new'
        btnVal='Crear Categoria'
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
        <Formik
          enableReinitialize={true}
          initialValues={initialFormValues}
          validate={
            (values) => {
              const errors = {};

              if (!values['category-name']) {
                errors.name = 'Campo requerido';
              }
              return errors;
            }
          }
          onSubmit={(values) => handleSubmit(values)}
        >
          {({values, isSubmitting}) => {
            return (
              <Form>
                <label htmlFor="name">Nombre</label>
                <Field
                  type='text'
                  id='category-name'
                  name='category-name'
                  className='form-control'
                />
                <ErrorMessage name='category-name' component='div' />
                <FieldArray
                  name='properties'
                  render={(arrayHelpers) => (
                    <div>
                      {values.properties &&
                        values.properties.map((property, index) => (
                          <div key={index} id={`property-${index}`}>
                            <Field
                              name={`properties.${index}.propertyName`}
                              className='form-control ms-4'
                            />
                            <button
                              className='btn btn-secondary'
                              type='button'
                              onClick={() => {
                                if (values.properties[index]['propertyId']) {
                                  const div = document.getElementById(
                                      `property-${index}`,
                                  );
                                  div.classList.add('d-none');
                                  values.properties[index]['_destroy'] = true;
                                } else {
                                  arrayHelpers.remove(index);
                                }
                              }}>
                              -
                            </button>
                          </div>
                        ))
                      }
                      <button
                        className='btn btn-secondary'
                        type="button"
                        onClick={
                          () => arrayHelpers.push(
                              {propertyName: '',
                                propertyId: '',
                                new: true})}
                      >
                         +
                      </button>
                    </div>
                  )}
                />
                <button
                  type='submit'
                  className='btn btn-primary'
                >
                Guardar
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CategoriesEdit;
