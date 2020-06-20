import Frisbee from 'frisbee'

const {JSONBIN_TOKEN} = process.env
const client = new Frisbee({
  baseURI: `https://api.jsonbin.io/v3`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Master-Key': JSONBIN_TOKEN,
  },
})

const getTrackingCodeRecord = (code) => client.get(`/b/${code}`).then((r) => r.body)

const updateTrackingCodeRecord = async (code, data) => {
  const record = await getTrackingCodeRecord(code)

  if (!record) {
    return client.post(`/b`, {
      headers: {
        'X-Bin-Name': code,
      },
      body: data,
    })
  }

  return client.post(`/b/${code}`, {
    body: {
      ...record,
      ...data,
    },
  })
}

const setStatusForTrackingCode = async (status, code) => {
  const record = await getTrackingCodeRecord(code)
  return client
    .put(`/b/${code}`, {
      body: {
        ...record,
        status,
      },
    })
    .then((r) => r.body)
}

export {getTrackingCodeRecord, updateTrackingCodeRecord}
