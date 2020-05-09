/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef, useMemo, useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {placeOrder} from './api';

import Field from './Field';

function Step2({state, onComplete}) {
  const {company, jurisdiction} = state;
  const {officers} = company;

  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState();
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

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (stripeError) {
      elements.getElement('card').focus();
      return;
    }

    const {paymentMethod, error: stripeError} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
      },
    });

    if (stripeError) {
      setStripeError(stripeError);
      return;
    } else {
      setPaymentMethod(paymentMethod);
    }

    const payload = {
      ...state,
      ...values,
      companyName: state.company.name,
      companyNumber: state.company.companyNumber,
      paymentMethod: paymentMethod.id,
      jurisdiction,
    };

    try {
      await placeOrder(payload);
      onComplete(payload);
    } catch (error) {
      const {failureReason} = error;
      setError(failureReason);
      return Promise.resolve({success: true});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h3>Applicant Information</h3>

        <Field name="officer" label="Officers" ref={register}>
          <select>
            <option value="">Find your name or add it below</option>
            {officers.map(({officer}) => (
              <option key={officer.id} value={officer.name}>
                {officer.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          name="firstName"
          label="First Name"
          ref={register({
            required: true,
          })}
        />

        <Field
          name="lastName"
          label="Last Name"
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

        <Field
          name="years"
          label="Number of years"
          ref={register({
            required: true,
          })}
        >
          <select>
            {[1, 2, 3, 4, 5].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>
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

      {error && <div style={{marginTop: '1rem', color: 'red'}}>{error}</div>}
    </form>
  );
}

export default Step2;
