import React from 'react';
import useValidations from '../hooks/useValidations';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

const OrderPayMethod = ({values, handleChange, handleSubmit, setErrors,
  errors}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    handleInformationValidations,
    handleShippingValidations,
    handlePayMethodValidations,
  } = useValidations();

  const history = useHistory();

  const handleForm = (e) => {
    e.preventDefault();
    handleInformationValidations(setErrors, values, errors);
    handleShippingValidations(setErrors, values, errors);
    handlePayMethodValidations(setErrors, values, errors);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (
      !values.email ||
    !values.name ||
    !values.last_name ||
    !values.address ||
    !values.city ||
    !values.comuna ||
    !values.phone) {
      handleInformationValidations(setErrors, values, errors);
      history.push('/order/new?step=information');
    } else if (
      !values['shipping-method']
    ) {
      handleShippingValidations(setErrors, values, errors);
      history.push('/order/new?step=shipping');
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
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
        <li
          className="list-group-item"
        >
          <span
            className="block-label"
          >
        Metodo de envio
          </span>
          {values['shipping-method']}
          <span
            className="link-change"
          >
            <Link to="/order/new?step=shipping">Cambiar...</Link>
          </span>
        </li>
      </ul>
      <h1>Metodo de pago</h1>
      <form onSubmit={handleForm}>
        <div className="form-check">
          {errors['pay-method'] && <p
            className="alert alert-warning"
          >
            {errors['pay-method']}
          </p>}
          <label
            htmlFor="webpay"
            className="form-check-label"
          >Webpay</label>
          <input
            className="form-check-input"
            type="radio"
            id="webpay"
            name="pay-method"
            value="webpay"
            checked={values['pay-method'] === 'webpay'}
            onChange={handleChange}
          />
        </div>
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="transfer"
          >Transferencia</label>
          <input
            className="form-check-input"
            type="radio"
            id="transfer"
            name="pay-method"
            value="transfer"
            checked={values['pay-method'] === 'transfer'}
            onChange={handleChange}
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

export default OrderPayMethod;
