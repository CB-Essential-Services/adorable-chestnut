/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {navigate} from 'gatsby';
import {placeOrder} from './api';

import Field from './Field';

function Step1({onComplete}) {

  const stripe = useStripe();
  const elements = useElements();

  const [stripeError, setStripeError] = useState();
  const [error, setError] = useState();

  const {
    handleSubmit,
    register,
    control,
    errors,
    setValue,
    getValues,
    watch,
    formState: {isSubmitting, isSubmitted, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const {officer} = watch();

  useEffect(() => {
    if (officer) {
      const [firstName, ...nameParts] = officer.split(' ');
      setValue([{firstName}, {lastName: nameParts.join(' ')}]);
    }
  }, [officer, setValue]);

  const onSubmit = async (values) => {
    setError();
    setStripeError();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const {paymentMethod, error: newStripeError} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
      },
    });

    if (newStripeError) {
      setStripeError(newStripeError);
      elements.getElement('card').focus();
      return Promise.resolve({success: false});
    }

    const payload = {
      ...values,
      paymentMethod: paymentMethod.id,
    };

    try {
      const {orderTrackingCode} = await placeOrder(payload);
      navigate(`/status?orderTrackingCode=${orderTrackingCode}`);
    } catch (error) {
      setError(error);
      return Promise.resolve({success: false});
    }
  };
  
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };
  
        return (
      <form name="transfer" method="post" action="/thanks/" data-netlify="true" data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="transfer" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>

        <section>
        <h3>Payment Method</h3>
        <Field>
          <CardElement />
        </Field>
      </section>

      <section>
        <h3>Submit Request</h3>
        <Field>
          <label htmlFor="terms">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              ref={register({
                required: true,
              })}
            />{' '}
            I hereby accept the Terms & Conditions and Privacy Policy and give permission to apply
            for an LEI.
          </label>
        </Field>
        </section>

            {/* {isValid && ( */}
              <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {/* )} */}

      {error && (
        <div style={{marginTop: '1rem', color: 'red'}}>
          {error.failureReason ||
            (error.type?.startsWith('StripeCardError') && 'There was an error with your card.')}
        </div>
      )}

      {stripeError && <div style={{marginTop: '1rem', color: 'red'}}>{stripeError.message}</div>}
    </form>
  );
}

export default Step1;