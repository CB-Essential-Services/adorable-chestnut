import qs from 'querystring'
import sendgridMail from './helpers/sendgridMail'
import sendgridClient from './helpers/sendgridClient'
import extractHostFromContext from './helpers/extractHostFromContext'

import {getTrackingCodeRecord, updateTrackingCodeRecord} from './helpers/fauna'
import getRapidLeiClient from './helpers/getRapidLeiClient'

export async function handler(event, context) {
  try {
    const {orderTrackingCode, orderStatus} = qs.parse(event.body)
    const {
      data: {
        email,
        orderStatus: oldOrderStatus,
        subscriptionId,
        ...orderRecord
      },
    } = await getTrackingCodeRecord(orderTrackingCode)
    // console.log(orderTrackingCode, oldOrderStatus, orderStatus, email)

    if (!email) {
      throw new Error('No email address found for order')
    }

    if (oldOrderStatus === orderStatus) {
      return {
        statusCode: 200,
        body: 'Status already handled',
      }
    }

    const rapidLeiClient = await getRapidLeiClient()
    const orderResult = await rapidLeiClient.get(
      `/lei/orders/${orderTrackingCode}/status`
    )

    const templateId = await sendgridClient
      .request({
        method: 'GET',
        url: '/v3/templates?generations=dynamic',
      })
      .then(([response, body]) => {
        const template = body.templates.find((x) => x.name === orderStatus)
        if (template?.versions?.length > 0) {
          return template.id
        }
      })

    if (!templateId) {
      return {
        statusCode: 200,
        body: 'No email template found',
      }
    }

    await Promise.all([
      updateTrackingCodeRecord(orderTrackingCode, orderResult.body),
      subscriptionId &&
        stripe.subscriptions.update(subscriptionId, {
          metadata: orderResult.body,
        }),
    ])

    const host = extractHostFromContext(context)

    await sendgridMail.send({
      to: email,
      templateId,
      dynamicTemplateData: {
        ...orderRecord,
        orderTrackingCode,
        orderStatus,
        link: `${host}/status?orderTrackingCode=${orderTrackingCode}`,
        ...orderResult.body,
      },
    })

    return {
      statusCode: 200,
      body: '',
    }
  } catch (error) {
    if (error?.response?.body?.errors) {
      console.log(error.response.body.errors)
    }

    console.log(error)

    return {
      statusCode: 500,
      body: JSON.stringify({error: error.message}),
    }
  }
}
