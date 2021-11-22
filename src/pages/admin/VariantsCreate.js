import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import {useFormik, Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';
import {useParams} from 'react-router-dom';
import useVariants from '../../hooks/useVariants';
import useProducts from '../../hooks/useProducts';

const VariantsCreate = () => {
  const {create} = useVariants();
  const {properties} = useProducts();
  const {id} = useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [props, setProps] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});

  React.useEffect(() => {
    properties(id)
        .then((res) => {
          setProps(res.data);
        });
  }, [id]);

  React.useEffect(() => {
    initValues();
  }, []);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('variant[price]', values.variant.price);
    formData.append('variant[stock]', values.variant.stock);
    formData.append('variant[size]', 'a');
    Object.entries(values.product_property).forEach(([key,val], index) => {
    
        formData.append(`variant[product_properties_attributes][${index}][value]`, val.value);
        formData.append(`variant[product_properties_attributes][${index}][property_id]`, key);
      
    });
    create(id, formData)
        .then(() => setSubmitStatus('success'))
        .catch(() => setSubmitStatus('error'));
  };

  const renderProperties = props.map((item) => {
    return (
      <div key={item.id}>
        <label
          htmlFor={`product_property-${item.id.toString()}`}
          className='form-label'
        >
          {item.name}
        </label>
        <Field
          id={`product_property.${item.id.toString()}.value`}
          type='text'
          name={`product_property.${item.id.toString()}.value`}
          className='form-control'
        />
      </div>
    );
  });

  const initValues = () => {
    const values = {
      variant: {
        price: '',
        stock: '',
      },
      product_property: {},
    };

    props.forEach((item) => {
      values.product_property[item.id] = '';
    });
    setInitialValues(values);
  };

  return (
    <>
      <ContentHeader title="Crear variante"/>
      <div className="admin-content-wrapper">
        {submitStatus === 'success' &&
        <div
          className="alert alert-success"
        >
          Variante creada correctamente.
        </div> }
        {submitStatus === 'error' &&
          <div
            className="alert alert-warning"
          >
          La variante no pudo ser creado, intentelo mas tarde.
          </div>
        }
        <fieldset>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validate={
              (values) => {
                let errors = {};
                errors.variant = {};

                if (!values.variant.price) {
                  errors.variant.price = 'Campo requerido';
                }
                if (!values.variant.stock) {
                  errors.variant.stock = 'Campo requerido';
                }

                if (Object.keys(errors.variant).length === 0) errors = {};
                return errors;
              }
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            {(a) => {
              console.log(a.values);
              return (
                <Form>
                  <label htmlFor="variant-price">
                    Precio
                  </label>
                  <Field
                    type='text'
                    id='variant-price'
                    name='variant[price]'
                    className='form-control'
                  >
                  </Field>
                  <ErrorMessage name='variant[price]' component='div'/>
                  <label htmlFor="variant-price">
                    Stock
                  </label>
                  <Field
                    type='text'
                    id='variant-stock'
                    name='variant[stock]'
                    className='form-control'
                  >
                  </Field>
                  <ErrorMessage name='variant[stock]' component='div' />
                  {renderProperties}
                  <button type='submit'>Crear</button>
                </Form>
              );
            }}
          </Formik>
        </fieldset>
      </div>
    </>
  );
};

export default VariantsCreate;
