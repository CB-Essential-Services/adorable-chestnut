import qs from 'querystring'
import fetch from 'node-fetch'
import Stripe from 'stripe'
import {setEmailForTrackingCode} from './helpers/jsonbin'
import extractHostFromContext from './helpers/extractHostFromContext'

const {
  STRIPE_SECRET_KEY,
  STRIPE_PLAN_ID,
  RAPID_LEI_TOKEN,
  RAPID_LEI_HOST,
  RAPID_LEI_ID,
} = process.env

const stripe = Stripe(STRIPE_SECRET_KEY)

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'}
  }

  try {
    const host = extractHostFromContext(context)
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

    const order = await fetch(`${RAPID_LEI_HOST}/leis/orders/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(leiPayload),
    }).then((r) => r.json())

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

    const getCustomer = async () => {
      const {data: customerList} = await stripe.customers.list({
        email,
        limit: 1,
      })

      let customer = customerList && customerList[0]

      return (
        customer ||
        stripe.customers.create({
          name: `${firstName} ${lastName}`,
          email,
          payment_method: paymentMethod,
          invoice_settings: {
            default_payment_method: paymentMethod,
          },
        })
      )
    }

    const [customer, trackingRecord] = await Promise.all([
      getCustomer(),
      setEmailForTrackingCode(email, order.orderTrackingCode),
    ])

    // https://stripe.com/docs/api/subscriptions/create
    // const cancelDate = addYears(new Date(), years)
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer.id,
    //   items: [{plan: STRIPE_PLAN_ID}],
    //   expand: ['latest_invoice.payment_intent'],
    //   cancel_at: Math.floor(cancelDate.valueOf() / 1000),
    // })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // subscription,
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
