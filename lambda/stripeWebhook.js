import {getTrackingCodeRecord} from './helpers/fauna'
import getRapidLeiClient from './helpers/getRapidLeiClient'
import stripe from './helpers/stripe'

const renewLei = async (invoice) => {
  const rapidLeiClient = await getRapidLeiClient()
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
  const {orderTrackingCode} = subscription.metadata
  const {
    data: {leiNumber},
  } = getTrackingCodeRecord(orderTrackingCode)

  const renewResult = await rapidLeiClient.post(`/leis/orders/renew`, {
    body: {
      leiNumber,
      isLevel1DataSame: true,
    },
  })

  console.log(renewResult)
}

export async function handler(event, context) {
  try {
    const stripeEvent = JSON.parse(request.body)
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoice = event.data.object
        return renewLei(invoice)
        break
      default:
        console.log(event)
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
