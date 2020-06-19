import Stripe from 'stripe'
import {getTrackingCodeRecord} from './helpers/jsonbin'
import getRapidLeiClient from './helpers/getRapidLeiClient'
import getStripeCustomer from './helpers/getStripeCustomer'
import {addYears} from 'date-fns'

const {STRIPE_PLAN_ID} = process.env
const stripe = Stripe(STRIPE_SECRET_KEY)

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'}
  }

  try {
    const {orderTrackingCode, confirm = true} = JSON.parse(event.body)
    const rapidLeiClient = await getRapidLeiClient()

    const createStripeSubscription = async () => {
      const {email} = await getTrackingCodeRecord(orderTrackingCode)
      const customer = await getStripeCustomer({email})
      const cancelDate = addYears(new Date(), years)
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{plan: STRIPE_PLAN_ID}],
        expand: ['latest_invoice.payment_intent'],
        cancel_at: Math.floor(cancelDate.valueOf() / 1000),
        collection_method: 'charge_automatically',
      })
      return subscription
    }

    const [statusResult, rdConfirmationResult, stripeResult] = await Promise.all([
      rapidLeiClient.get(`/lei/orders/${orderTrackingCode}/status`),
      rapidLeiClient.put(`/lei/orders/${orderTrackingCode}/confirmation/${confirm}`),
      createStripeSubscription(),
    ])

    if (statusResult.error || rdConfirmationResult.error || stripeResult.error) {
      throw statusResult.error || rdConfirmationResult.error || stripeResult.error
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: statusResult.body,
        rdConfirmation: rdConfirmationResult.body,
      }),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
