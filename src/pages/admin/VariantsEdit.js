import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import {useParams} from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useVariants from '../../hooks/useVariants';
import AdminSpinner from '../../components/AdminSpinner';
import ProductMenu from '../../components/ProductMenu';
import {useFormik, Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';
import useProducts from '../../hooks/useProducts';

const VariantsEdit = () => {
  const {handleChange, values, setValues} = useForm({
    size: '',
    price: '',
    stock: '',
  });
  const {productId, id} = useParams();
  const {properties} = useProducts();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [isLoading, setIsLoading] = React.useState(false);
  const {edit, editPatch} = useVariants();
  const [props, setProps] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});

  React.useEffect(() => {
    getVariant();
  }, [id]);

  React.useEffect(() => {
    properties(productId)
        .then((res) => {
          setProps(res.data);
        });
  }, [productId]);

  const getVariant = () => {
    setIsLoading(true);
    edit(id)
        .then((res) => {
          const values = {
            variant: {
              price: res.data.price,
              stock: res.data.stock,
            },
            product_property: {},
          };
          res.data.product_properties.forEach((item) => {
            values.product_property[item.property_id] = {value: item.value};
          });
          setInitialValues(values);
          setIsLoading(false);
        });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('variant[price]', values.variant.price);
    formData.append('variant[stock]', values.variant.stock);
    formData.append('variant[size]', 'a');
    console.log(values, 'submit');
    Object.entries(values.product_property).forEach(([key, val], index) => {
      formData.append(
          `variant[product_properties_attributes][${index}][value]`,
          val.value,
      );
      formData.append(
          `variant[product_properties_attributes][${index}][property_id]`,
          key,
      );
    });
    editPatch(id, formData)
        .then(() => {
          setSubmitStatus('success');
          setIsLoading(false);
        })
        .catch(() => {
          setSubmitStatus('error');
          setIsLoading(false);
        });
  };

  const handleValidations = () => {
    const errors = {};

    if (+values.price < 0) {
      errors.price = 'El precio no puede ser menor que 0';
    }
    if (typeof +values.price !== 'number') {
      errors.price = 'El precio tiene que ser un numero';
    }
    if (typeof +values.stock !== 'number') {
      errors.stock = 'El stock tiene que ser un numero';
    }
    if (+values.stock < 0) {
      errors.stock = 'El stock no puede ser menor que 0';
    }
    setErrors(errors);
  };


  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleForm = (e) => {
    e.preventDefault();
    handleValidations();
    setIsSubmitting(true);
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

  return (
    <>
      {isLoading && <AdminSpinner />}
      <ContentHeader title="Editar variante"/>
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
        <ProductMenu variant="variant" productId={productId}/>
        <fieldset>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(a) => {
              console.log(a.values);
              return (
                <Form>
                  <label htmlFor="variant-price">Precio</label>
                  <Field
                    type='text'
                    id='variant-price'
                    name='variant[price]'
                    className='form-control'
                  />
                  <ErrorMessage name='variant[price]' component='div'/>
                  <label htmlFor="variant-stock">Stock</label>
                  <Field
                    type='text'
                    id='variant-stock'
                    name='variant[stock]'
                    className='form-control'
                  />
                  <ErrorMessage name='variant[stock]' component='div' />
                  {renderProperties}
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
        </fieldset>
      </div>
    </>
  );
};

export default VariantsEdit;
