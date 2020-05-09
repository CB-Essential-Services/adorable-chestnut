import qs from 'querystring'
import fetch from 'node-fetch'

const {RAPID_LEI_TOKEN, RAPID_LEI_HOST, RAPID_LEI_ID, JSONBIN_TOKEN, JSONBIN_USERNAME} = process.env

export async function handler(event, context) {
  try {
    const params = event.queryStringParameters
    const {orderTrackingCode} = params

    const authResult = await fetch(`${RAPID_LEI_HOST}/auth/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: RAPID_LEI_ID,
        client_secret: RAPID_LEI_TOKEN,
      }),
    }).then((r) => r.json())

    const token = authResult.access_token

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    const status = await fetch(`${RAPID_LEI_HOST}/lei/orders/${orderTrackingCode}/status`, {
      headers,
      method: 'GET',
    }).then((r) => r.json())

    return {
      statusCode: 200,
      body: JSON.stringify(status),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
