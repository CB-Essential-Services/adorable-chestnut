/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {useForm} from 'react-hook-form';
import { navigate } from 'gatsby';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {placeOrder} from './api';

import Field from './Field';

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
  
  export default function Step1() {
    const [state, setState] = React.useState({})

    const {
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
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
        );
    }