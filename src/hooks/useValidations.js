const useValidations = () => {
  const handleInformationValidations = (setErrors, values, oldErrors) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'El email no puede estar vacio';
    }
    if (!values.name) {
      errors.name = 'El nombre no puede estar vacio';
    }
    if (!values.last_name) {
      errors.last_name = 'El apellido no puede estar vacio';
    }
    if (!values.address) {
      errors.address = 'La direccion no puede estar vacia';
    }
    if (!values.city) {
      errors.city = 'La ciudad no puede estar vacia';
    }
    if (!values.comuna) {
      errors.comuna = 'La comuna no puede estar vacia';
    }
    if (!values.phone) {
      errors.phone = 'El telefono no puede estar vacio';
    }


    if (Object.keys(errors).length === 0) {
      setErrors(errors);
    } else {
      const err = {...oldErrors, errors};
      setErrors(err.errors);
    }
  };

  const handleShippingValidations = (setErrors, values, oldErrors) => {
    const errors = {};
    console.log(errors);
    if (!values['shipping-method']) {
      errors['shipping-method'] = 'Selecciona una metodo de envio.';
    }

    if (Object.keys(errors).length === 0) {
      setErrors(errors);
    } else {
      const err = {...oldErrors, errors};
      setErrors(err.errors);
    }
  };

  const handlePayMethodValidations = (setErrors, values, oldErrors) => {
    const errors = {};
    if (!values['pay-method']) {
      errors['pay-method'] = 'Selecciona un metodo de pago';
    }

    if (Object.keys(errors).length === 0) {
      setErrors(errors);
    } else {
      const err = {...oldErrors, errors};
      setErrors(err.errors);
    }
  };

  return {
    handleInformationValidations,
    handleShippingValidations,
    handlePayMethodValidations,
  };
};

export default useValidations;
