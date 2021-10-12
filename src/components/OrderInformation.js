import React from 'react';

const OrderInformation = ({
  values,
  handleChange,
  handleStepInformation,
  handleValidations,
  setErrors,
  errors,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log(errors);

  const handleForm = (e) => {
    e.preventDefault();
    handleValidations(setErrors, values);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleStepInformation();
      setIsSubmitting(false);
    }
  }, [errors]);

  return (
    <>
      <h1>Crear order</h1>
      <fieldset>
        <form onSubmit={handleForm}>
          <label
            className="form-label"
            htmlFor="email"
          >
            Email
          </label>
          {errors.email && <p
            className="alert alert-warning"
          >
            {errors.email}
          </p>}
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="email"
          />
          <label
            className="form-label"
            htmlFor="name"
          >
            Nombre
          </label>
          {errors.name && <p
            className="alert alert-warning"
          >
            {errors.name}
          </p>}
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="name"
          />
          <label
            className="form-label"
            htmlFor="last_name"
          >
            Apellido
          </label>
          {errors.last_name && <p
            className="alert alert-warning"
          >
            {errors.last_name}
          </p>}
          <input
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            className="form-control" type="text" id="last_name"/>
          <label
            className="form-label"
            htmlFor="address"
          >
            Direccion
          </label>
          {errors.address && <p
            className="alert alert-warning"
          >
            {errors.address}
          </p>}
          <input
            name="address"
            value={values.address}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="address"/>
          <label
            className="form-label"
            htmlFor="city"
          >
            Ciudad
          </label>
          {errors.city && <p
            className="alert alert-warning"
          >
            {errors.city}
          </p>}
          <input
            name="city"
            value={values.city}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="city"/>
          <label
            className="form-label"
            htmlFor="comuna"
          >
            Comuna
          </label>
          {errors.comuna && <p
            className="alert alert-warning"
          >
            {errors.comuna}
          </p>}
          <input
            name="comuna"
            value={values.comuna}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="comuna"/>
          <label
            className="form-label"
            htmlFor="phone"
          >
            Telefono
          </label>
          {errors.phone && <p
            className="alert alert-warning"
          >
            {errors.phone}
          </p>}
          <input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="form-control"
            type="text"
            id="phone"
          />
          <input
            className="btn btn-primary"
            type="submit"
          />
        </form>
      </fieldset>
    </>
  );
};

export default OrderInformation;
