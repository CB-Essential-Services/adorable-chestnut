/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef, useMemo, useState, useEffect} from 'react';
import {useAsync, useSetState} from 'react-use';
import PropTypes from 'prop-types';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';

import Step1 from './Step1';
import Step2 from './Step2';
import ThankYou from './ThankYou';

const StepToComponent = [Step1, Step2, ThankYou];

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const MOCK = {
  jurisdiction: 'US-NV',
  company: {
    name: 'NS8, INC.',
    branch: 'F',
    inactive: false,
    source: {
      publisher: "Nevada Secretary of State's Office",
      url: null,
      retrievedAt: '2019-05-14T00:56:48+00:00',
    },
    identifiers: [],
    data: null,
    filings: [
      {
        filing: {
          id: 515993735,
          title: 'Annual List',
          uid: '20180529466-13',
          date: '2018-12-10',
          opencorporatesUrl: 'https://opencorporates.com/filings/515993735',
        },
      },
      {
        filing: {
          id: 439065383,
          title: 'Amended List',
          uid: '20180065740-03',
          date: '2018-02-10',
          opencorporatesUrl: 'https://opencorporates.com/filings/439065383',
        },
      },
      {
        filing: {
          id: 439065384,
          title: 'Annual List',
          uid: '20170471317-63',
          date: '2017-11-06',
          opencorporatesUrl: 'https://opencorporates.com/filings/439065384',
        },
      },
      {
        filing: {
          id: 439065386,
          title: 'Initial List',
          uid: '20160365799-18',
          date: '2016-08-17',
          opencorporatesUrl: 'https://opencorporates.com/filings/439065386',
        },
      },
      {
        filing: {
          id: 439065385,
          title: 'Foreign Qualification',
          uid: '20160365797-96',
          date: '2016-08-17',
          opencorporatesUrl: 'https://opencorporates.com/filings/439065385',
        },
      },
    ],
    officers: [
      {
        officer: {
          id: 251111698,
          name: 'NS8, INC. C/O CEO',
          position: 'agent',
          uid: null,
          occupation: null,
          inactive: false,
          startDate: null,
          endDate: null,
          opencorporatesUrl: 'https://opencorporates.com/officers/251111698',
          currentStatus: null,
        },
      },
      {
        officer: {
          id: 251111701,
          name: 'ADAM ROGAS',
          position: 'president',
          uid: null,
          occupation: null,
          inactive: false,
          startDate: null,
          endDate: null,
          opencorporatesUrl: 'https://opencorporates.com/officers/251111701',
          currentStatus: 'Active',
        },
      },
      {
        officer: {
          id: 279034331,
          name: 'DAVID HANSEN',
          position: 'treasurer',
          uid: null,
          occupation: null,
          inactive: false,
          startDate: null,
          endDate: null,
          opencorporatesUrl: 'https://opencorporates.com/officers/279034331',
          currentStatus: 'Active',
        },
      },
      {
        officer: {
          id: 279034332,
          name: 'ERIC KAY',
          position: 'secretary',
          uid: null,
          occupation: null,
          inactive: false,
          startDate: null,
          endDate: null,
          opencorporatesUrl: 'https://opencorporates.com/officers/279034332',
          currentStatus: 'Active',
        },
      },
      {
        officer: {
          id: 279034333,
          name: 'ADAM ROGAS',
          position: 'director',
          uid: null,
          occupation: null,
          inactive: false,
          startDate: null,
          endDate: null,
          opencorporatesUrl: 'https://opencorporates.com/officers/279034333',
          currentStatus: 'Active',
        },
      },
    ],
    companyNumber: 'E0365482016-8',
    jurisdictionCode: 'us_nv',
    incorporationDate: '2016-08-17',
    dissolutionDate: null,
    companyType: 'Foreign Corporation',
    registryUrl: null,
    branchStatus: 'branch of an out-of-jurisdiction company',
    currentStatus: 'Active',
    createdAt: '2016-09-25T19:54:12+00:00',
    updatedAt: '2019-06-12T14:50:13+00:00',
    retrievedAt: '2019-05-14T00:56:48+00:00',
    opencorporatesUrl: 'https://opencorporates.com/companies/us_nv/E0365482016-8',
    agentName: 'NS8, INC. C/O CEO',
    agentAddress: {
      locality: 'LAS VEGAS',
      region: 'NV',
      streetAddress: '11616 ZAGARPLO LN',
      postalCode: '89141',
    },
    alternativeNames: [],
    previousNames: [],
    numberOfEmployees: null,
    nativeCompanyNumber: 'E0365482016-8',
    alternateRegistrationEntities: [],
    previousRegistrationEntities: [],
    subsequentRegistrationEntities: [],
    registeredAddressInFull: null,
    industryCodes: [],
    trademarkRegistrations: [],
    corporateGroupings: [],
    financialSummary: null,
    homeCompany: {
      name: 'NS8 INC.',
      jurisdictionCode: 'us_de',
      companyNumber: '6126306',
      opencorporatesUrl: 'https://opencorporates.com/companies/us_de/6126306',
    },
    controllingEntity: {
      name: 'NS8 INC.',
      jurisdictionCode: 'us_de',
      companyNumber: '6126306',
      opencorporatesUrl: 'https://opencorporates.com/companies/us_de/6126306',
    },
    ultimateBeneficialOwners: [],
  },
};

const RegistrationForm = () => {
  const [state, setState] = useSetState(MOCK);
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

export default RegistrationForm;
