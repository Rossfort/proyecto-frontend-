import React from 'react';
import {useHistory} from 'react-router-dom';
import useValidations from '../hooks/useValidations';
import {Link} from 'react-router-dom';

const OrderShipping = ({values, handleChange, handleStepPayment, setErrors,
  errors}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const history = useHistory();

  const {
    handleInformationValidations,
    handleShippingValidations,
  } = useValidations();

  React.useEffect(() => {
    if (!values.email ||
        !values.name ||
    !values.last_name ||
    !values.address ||
    !values.city ||
    !values.comuna ||
    !values.phone) {
      handleInformationValidations(setErrors, values, errors);
      history.push('/order/new?step=information');
    }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    handleInformationValidations(setErrors, values, errors);
    handleShippingValidations(setErrors, values, errors);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleStepPayment();
      setIsSubmitting(false);
    }
  }, [errors]);
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <span
            className="block-label"
          >
        Contacto
          </span >
          {values.email}
          <span
            className="link-change"
          >
            <Link to="/order/new?step=information">Cambiar...</Link>
          </span>
        </li>
        <li className="list-group-item">
          <span
            className="block-label"
          >
        Enviar a
          </span>
          {`${values.address}, ${values.comuna}, ${values.city}`}
          <span
            className="link-change"
          >
            <Link to="/order/new?step=information">Cambiar...</Link>
          </span>
        </li>
      </ul>
      <h1>Metodo de envio</h1>
      <form onSubmit={handleForm}>
        <div className="form-check">
          {errors['shipping-method'] && <p
            className="alert alert-warning"
          >
            {errors['shipping-method']}
          </p>}
          <label
            className="form-check-label"
            htmlFor="transfer"
          >Starken</label>
          <input
            className="form-check-input"
            type="radio"
            name="shipping-method"
            value="starken"
            onChange={handleChange}
            checked={values['shipping-method'] === 'starken'}
          />
        </div>
        <input
          className="btn btn-primary"
          type="submit"
        />
      </form>
    </>
  );
};

export default OrderShipping;
