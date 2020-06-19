import Frisbee from 'frisbee'

const {JSONBIN_TOKEN, JSONBIN_USERNAME} = process.env
const client = new Frisbee({
  baseURI: `https://jsonbin.org/${JSONBIN_USERNAME}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `token ${JSONBIN_TOKEN}`,
  },
})

const getTrackingCodeRecord = (code) => client.get(`/${code}`).then((r) => r.body)

const setEmailForTrackingCode = (email, code) =>
  client
    .post(`/${code}`, {
      body: {
        email,
      },
    })
    .then((r) => r.body)

const setStatusForTrackingCode = (status, code) =>
  client
    .patch(`/${code}`, {
      body: {
        status,
      },
    })
    .then((r) => r.body)

export {getTrackingCodeRecord, setEmailForTrackingCode, setStatusForTrackingCode}
