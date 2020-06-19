import {setEmailForTrackingCode} from './helpers/jsonbin'
import extractHostFromContext from './helpers/extractHostFromContext'
import getRapidLeiClient from './helpers/getRapidLeiClient'
import getStripeCustomer from './helpers/getStripeCustomer'

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'}
  }

  try {
    const rapidLeiClient = await getRapidLeiClient()
    const host = extractHostFromContext(context)

    const {
      paymentMethod,
      email,
      firstName,
      lastName,
      companyName,
      companyNumber,
      jurisdiction,
      isLevel2DataAvailable,
      years = 1,
      ...payload
    } = JSON.parse(event.body)

    const leiPayload = {
      firstName,
      lastName,
      companyName,
      companyNumber,
      isLevel2DataAvailable,
      legalJurisdiction: jurisdiction,
      multiYearSupport: years,
      notificationUrl: `${host}/.netlify/functions/notify`,
    }

    const orderResult = await rapidLeiClient.post(`/leis/orders/create`, {
      body: leiPayload,
    })

    if (orderResult.error) {
      throw orderResult.error
    }

    const order = orderResult.body

    if (!order.orderTrackingCode) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: order,
        }),
      }
    }

    const [customer, trackingRecord] = await Promise.all([
      // creates customer if they don't exist
      getStripeCustomer({email, firstName, lastName, paymentMethod}),
      setEmailForTrackingCode(email, order.orderTrackingCode),
    ])

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order,
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({error}),
    }
  }
}
