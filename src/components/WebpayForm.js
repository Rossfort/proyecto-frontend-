import React from 'react';

const WebpayForm = ({form}) => {
  console.log(form);
  return (
    <>
      <div className="card">
        <div className="card-header">
            Resumen de la orden.
        </div>
        <div className="card-body">
          <div
            className="card-text"
          >
              Codigo de la orden: {form.order.uuid}
          </div>
          <div
            className="card-text"
          >
              total a pagar: {form.order.amount}
          </div>
        </div>
      </div>
      <form
        action={form.res.url}
        method="post">
        <input
          type="hidden"
          name="token_ws"
          value={form.res.token}
        />
        <input
          type="submit"
          value="Ir a webpay"
          className="btn btn-primary"
        />
      </form>
    </>
  );
};

export default WebpayForm;
