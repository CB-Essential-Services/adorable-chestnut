import fetch from 'node-fetch'

const {JSONBIN_TOKEN, JSONBIN_USERNAME} = process.env

const findTrackingCode = (code) =>
  fetch(`https://jsonbin.org/${JSONBIN_USERNAME}/${code}`, {
    method: 'GET',
    headers: {
      authorization: `token ${JSONBIN_TOKEN}`,
    },
  }).then((r) => r.json())

const setEmailForTrackingCode = (email, code) =>
  fetch(`https://jsonbin.org/${JSONBIN_USERNAME}/${code}`, {
    method: 'POST',
    headers: {
      authorization: `token ${JSONBIN_TOKEN}`,
    },
    body: JSON.stringify({
      email,
    }),
  }).then((r) => r.json())

const setStatusForTrackingCode = (status, code) =>
  fetch(`https://jsonbin.org/${JSONBIN_USERNAME}/${code}`, {
    method: 'PATCH',
    headers: {
      authorization: `token ${JSONBIN_TOKEN}`,
    },
    body: JSON.stringify({
      status,
    }),
  }).then((r) => r.json())

export {findTrackingCode, setEmailForTrackingCode, setStatusForTrackingCode}
