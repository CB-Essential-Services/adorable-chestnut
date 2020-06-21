import qs from 'querystring'
import Frisbee from 'frisbee'

const {RAPID_LEI_TOKEN, RAPID_LEI_HOST, RAPID_LEI_ID} = process.env

export default async function getRapidLeiClient() {
  const client = new Frisbee({
    baseURI: RAPID_LEI_HOST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const authResult = await client.post('/auth/token', {
    body: qs.stringify({
      grant_type: 'client_credentials',
      client_id: RAPID_LEI_ID,
      client_secret: RAPID_LEI_TOKEN,
    }),
  })

  if (authResult.error) {
    throw authResult.error
  }

  const token = authResult.body.access_token
  client.jwt(token)

  return client
}
