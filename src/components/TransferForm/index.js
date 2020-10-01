/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef, useMemo, useState, useEffect} from 'react';
import {useAsync, useSetState} from 'react-use';
import PropTypes from 'prop-types';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';

import Step1 from './Step1';

const StepToComponent = [Step1];

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const TransferForm = () => {
  const [state, setState] = useSetState();
  const [step, setStep] = useState(0);

  const onComplete = (data) => {
    setState(data);

    setStep((x) => x + 1);
  };

  const Step = StepToComponent[step];
  return (
    <div className="inner" style={{maxWidth: 500}}>
      <Elements stripe={stripePromise}>
        <Step onComplete={onComplete} state={state} />
      </Elements>
    </div>
  );
};

export default TransferForm;