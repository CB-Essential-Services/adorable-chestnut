import Stripe from 'stripe'
import getStripeCustomer from './helpers/getStripeCustomer'
import extractHostFromContext from './helpers/extractHostFromContext'
import {getTrackingCodeRecord} from './helpers/jsonbin'

const {STRIPE_SECRET_KEY} = process.env
const stripe = Stripe(STRIPE_SECRET_KEY)

export async function handler(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return {statusCode: 405, body: 'Method Not Allowed'}
    }

    const host = extractHostFromContext(context)
    const {orderTrackingCode} = JSON.parse(event.body)
    const {email, status} = await getTrackingCodeRecord(orderTrackingCode)
    const customer = await getStripeCustomer({email})

    if (!customer) {
      throw new Error('Stripe customer not found')
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${host}/status?orderTrackingCode=${orderTrackingCode}`,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({error}),
    }
  }
}
