import React from 'react';
import axios from 'axios';
import useForm from '../hooks/useForm';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../features/cart/cartSlice';
import useQuery from '../hooks/useQuery';
import useValidations from '../hooks/useValidations';
import OrderInformation from '../components/OrderInformation';
import OrderShipping from '../components/OrderShipping';
import OrderPayMethod from '../components/OrderPayMethod';
import WebpayForm from '../components/WebpayForm';
import {useHistory} from 'react-router-dom';
import OrderNewBreadscrumb from '../components/OrderNewBreadscrumb';
import '../styles/order.css';

const STEPS = {
  information: 'information',
  shipping: 'shipping',
  pay_method: 'pay-method',
};

const OrderNew = () => {
  const {handleChange, values} = useForm({
    'email': '',
    'name': '',
    'last_name': '',
    'address': '',
    'city': '',
    'comuna': '',
    'phone': '',
    'pay-method': '',
    'shipping-method': '',
  });

  const dispatch = useDispatch();

  const [breadcrumbs, setBreadscrumb] = React.useState({
    'information': ['Informacion', true],
    'shipping': ['Envio', false],
    'pay-method': ['Pago', false],
  });
  const [step, setStep] = React.useState(
      useQuery().get('step') || 'information',
  );

  const [form, setForm] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const {handleInformationValidations} = useValidations();

  const cart = useSelector((state) => state.cart);

  const queryStep = useQuery().get('step');
  const history = useHistory();

  React.useEffect(() => {
    if (!queryStep) {
      setStep('information');
    } else {
      setStep(queryStep);
    }
  }, [queryStep]);

  const handleSubmit = () => {
    axios.post(process.env.REACT_APP_BASE_API_URL + '/api/orders', {
      order: {
        'name': values.name,
        'last_name': values.last_name,
        'address': values.address,
        'city': values.city,
        'comuna': values.comuna,
        'phone': values.phone,
        'pay_method': values['pay-method'],
        'shipping_method': values['shipping-method'],
      },
      email: values.email,
      cart,
    },
    {withCredentials: true},
    ).then((res) => {
      console.log(res);
      if (res.data.type === 'transfer') {
        dispatch(clearCart());
        history.push(`/transactions/${res.data.order.uuid}`);
      } else if (res.data.type === 'webpay') {
        setForm(res.data);
      }
    })
        .catch(console.log);
  };

  const handleStepPayment = () => {
    history.push(`/order/new?step=${STEPS.pay_method}`);
    setBreadscrumb({
      'information': ['Informacion', true],
      'shipping': ['Envio', true],
      'pay-method': ['Pago', true],
    });
  };

  const handleStepInformation = () => {
    history.push(`/order/new?step=${STEPS.shipping}`);
    setBreadscrumb({
      'information': ['Informacion', true],
      'shipping': ['Envio', true],
      'pay-method': ['Pago', false],
    });
  };

  console.log(form);

  const steps = {
    [STEPS.information]: <OrderInformation
      handleChange={handleChange}
      values={values}
      handleStepInformation={handleStepInformation}
      handleValidations={handleInformationValidations}
      setErrors={setErrors}
      errors={errors}
    />,
    [STEPS.shipping]: <OrderShipping
      handleChange={handleChange}
      values={values}
      handleStepPayment={handleStepPayment}
      setErrors={setErrors}
      errors={errors}
    />,
    [STEPS.pay_method]: <OrderPayMethod
      handleChange={handleChange}
      values={values}
      handleSubmit={handleSubmit}
      setErrors={setErrors}
      errors={errors}
    />,
  };

  if (form.res) {
    return (
      <WebpayForm form={form} />
    );
  }

  return (
    <>
      <OrderNewBreadscrumb
        breadcrumb={breadcrumbs}
        step={step}
      />
      {steps[step]}
    </>
  );
};

export default OrderNew;
