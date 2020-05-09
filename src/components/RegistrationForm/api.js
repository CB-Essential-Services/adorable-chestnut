import fetch from 'unfetch';

const getBaseUrl = () => {
  const {host, protocol} = document?.location;
  return `${host ? `${protocol}${host}` : ''}/.netlify/functions`;
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const placeOrder = async (body) => {
  const url = new URL(`${getBaseUrl()}/place-order`);
  return fetch(url, {headers, method: 'POST', body: JSON.stringify(body)})
    .then((r) => r.json())
    .then((body) => {
      return body.error ? Promise.reject(body.error) : body;
    });
};

export const confirmOrder = async (body) => {
  const url = new URL(`${getBaseUrl()}/confirm`);
  return fetch(url, {headers, method: 'POST', body: JSON.stringify(body)})
    .then((r) => r.json())
    .then((body) => {
      if (body.error) {
        return Promise.reject(body.error);
      }
      return body;
    });
};

export const getJurisdictions = async () => {
  const url = new URL(`${getBaseUrl()}/jurisdictions`);
  return fetch(url, {headers}).then((r) => r.json());
};

export const getOrder = async (trackingCode) => {
  const url = new URL(`${getBaseUrl()}/order?orderTrackingCode=${trackingCode}`);
  return fetch(url, {headers}).then((r) => r.json());
};

export const searchCompaniesByName = async ({jurisdiction, name}) => {
  const url = new URL(`${getBaseUrl()}/search`);
  const params = {
    jurisdiction,
    name,
  };
  url.search = new URLSearchParams(params).toString();
  return fetch(url, {
    headers,
  }).then((r) => r.json());
};

export const getCompany = ({jurisdiction, number}) => {
  const url = new URL(`${getBaseUrl()}/company`);
  const params = {
    jurisdiction,
    number,
  };
  url.search = new URLSearchParams(params).toString();
  return fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  }).then((r) => r.json());
};
