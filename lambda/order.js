import getRapidLeiClient from './helpers/getRapidLeiClient'

export async function handler(event, context) {
  try {
    const rapidLeiClient = await getRapidLeiClient()
    const params = event.queryStringParameters
    const {orderTrackingCode} = params

    const statusResult = await rapidLeiClient.get(
      `/lei/orders/${orderTrackingCode}/status`
    )

    if (statusResult.error) {
      throw statusResult.error
    }

    return {
      statusCode: 200,
      body: JSON.stringify(statusResult.body),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
