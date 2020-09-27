/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {navigate} from 'gatsby';
import {placeOrder} from './api';

import Field from './Field';

function Step1({state, onComplete}) {
  const {company} = state;

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

  const onSubmit = async (values) => {
    setError();
    setStripeError();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    function encode(data) {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    }

    export default function Step1() {
      const [state, setState] = React.useState({})
    
      const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
      }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...state,
        }),
      })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))
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
      ...state,
      ...values,
      paymentMethod: paymentMethod.id,
    };

  return (
    <form name="transferLEI" action="/thanks/" id="transfer-LEI" className="transfer-LEI" method="post" action="/thanks/" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="form-name" value="transferLEI" />

      <div className="screen-reader-text">
                    <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                </div>

            <section>
        <h3>Company Information</h3>

        <Field
          name="Company Name"
          label="Company Name"
          ref={register({
            required: true,
          })}
        />

        <Field
          name="LEI Code"
          label="LEI Code"
          ref={register({
            required: true,
          })}
        />
      </section>

      <section>
        <h3>Applicant Information</h3>

        <Field
          name="Name"
          label="Name"
          ref={register({
            required: true,
          })}
        />

        <Field
          name="Position"
          label="Position"
          ref={register({
            required: true,
          })}
        />

        <Field
          name="email"
          label="Email"
          type="email"
          ref={register({
            required: true,
          })}
        />
      </section>

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
            I hereby accept the Terms & Conditions and Privacy Policy and give permission to transfer
            my LEI.
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