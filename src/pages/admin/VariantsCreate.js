import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import useForm from '../../hooks/useForm';
import {useParams} from 'react-router-dom';
import useVariants from '../../hooks/useVariants';

const VariantsCreate = () => {
  const {handleChange, values} = useForm({
    size: '',
    price: '',
    stock: '',
  });
  const {create} = useVariants();
  const {id} = useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitStatus, setSubmitStatus] = React.useState('idle');


  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('variant[size]', values.size);
    formData.append('variant[price]', values.price);
    formData.append('variant[stock]', values.stock);
    create(id, formData)
        .then(() => setSubmitStatus('success'))
        .catch(() => setSubmitStatus('error'));
  };

  const handleValidations = () => {
    const errors = {};

    if (!values.price) {
      errors.price = 'El precio no puede estar vacio';
    }
    if (+values.price < 0) {
      errors.price = 'El precio no puede ser menor que 0';
    }
    if (!values.size) {
      errors.size = 'La talla no puede estar vacia';
    }
    if (!values.stock) {
      errors.stock = 'El stock no puede estar vacio';
    }
    if (+values.stock < 0) {
      errors.price = 'El stock no puede ser menor que 0';
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

export default VariantsCreate;
