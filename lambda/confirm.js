import qs from 'querystring'
import fetch from 'node-fetch'
const RAPID_LEI_TOKEN = process.env.RAPID_LEI_TOKEN
const RAPID_LEI_HOST = process.env.RAPID_LEI_HOST
const RAPID_LEI_ID = process.env.RAPID_LEI_ID

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'}
  }

  try {
    const {orderTrackingCode, confirm = true} = JSON.parse(event.body)

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

    const rdConfirmation = await fetch(
      `${RAPID_LEI_HOST}/lei/orders/${orderTrackingCode}/confirmation/${confirm}`,
      {
        headers,
        method: 'PUT',
      }
    ).then((r) => r.json())

    return {
      statusCode: 200,
      body: JSON.stringify({status, rdConfirmation}),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
