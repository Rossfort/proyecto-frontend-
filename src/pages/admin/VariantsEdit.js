import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import {useParams} from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useVariants from '../../hooks/useVariants';
import AdminSpinner from '../../components/AdminSpinner';
import ProductMenu from '../../components/ProductMenu';

const VariantsEdit = () => {
  const {handleChange, values, setValues} = useForm({
    size: '',
    price: '',
    stock: '',
  });
  const {productId, id} = useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [isLoading, setIsLoading] = React.useState(false);
  const {edit, editPatch} = useVariants();

  React.useEffect(() => {
    getVariant();
  }, [id]);

  const getVariant = () => {
    setIsLoading(true);
    edit(id)
        .then((res) => {
          setValues(
              {
                size: res.data.size,
                price: res.data.price,
                stock: res.data.stock,
              },
          );
          setIsLoading(false);
        });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('variant[size]', values.size);
    formData.append('variant[price]', values.price);
    formData.append('variant[stock]', values.stock);
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
          <form onSubmit={handleForm}>
            <label
              className="form-label"
              htmlFor="size"
            >
              Talla
            </label>
            {errors.size && <p
              className="alert alert-warning"
            >
              {errors.size}
            </p>}
            <input
              className="form-control"
              onChange={handleChange}
              id="size"
              type="text"
              name="size"
              value={values.size}
            />
            <label
              htmlFor="price"
            >
              Precio
            </label>
            {errors.price && <p
              className="alert alert-warning"
            >
              {errors.price}
            </p>}
            <input
              onChange={handleChange}
              id="price"
              name="price"
              className="form-control"
              type="number"
              value={values.price}
            />
            <label
              htmlFor="stock"
            >
              Stock
            </label>
            {errors.stock && <p
              className="alert alert-warning"
            >
              {errors.stock}
            </p>}
            <input
              onChange={handleChange}
              id="stock"
              name="stock"
              className="form-control"
              type="number"
              value={values.stock}
            />
            <input
              className="btn btn-primary mt-2"
              type="submit"
              value="Crear"
            />
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default VariantsEdit;
