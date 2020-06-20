import qs from 'querystring'
import sendgridMail from './helpers/sendgridMail'
import sendgridClient from './helpers/sendgridClient'
import extractHostFromContext from './helpers/extractHostFromContext'

import {getTrackingCodeRecord, updateTrackingCodeRecord} from './helpers/jsonbin'
import getRapidLeiClient from './helpers/getRapidLeiClient'

export async function handler(event, context) {
  try {
    const {orderTrackingCode, orderStatus} = qs.parse(event.body)
    const {email, status: originalStatus} = await getTrackingCodeRecord(orderTrackingCode)
    console.log(orderTrackingCode, originalStatus, orderStatus, email)

    if (!email) {
      throw new Error('No email address found for order')
    }

    if (originalStatus === orderStatus) {
      return {
        statusCode: 200,
        body: 'Status already handled',
      }
    }

    const rapidLeiClient = await getRapidLeiClient()
    const orderResult = await rapidLeiClient.get(`/lei/orders/${orderTrackingCode}/status`)

    const templateId = await sendgridClient
      .request({
        method: 'GET',
        url: '/v3/templates?generations=dynamic',
      })
      .then(([response, body]) => {
        const template = body.templates.find((x) => x.name === orderStatus)
        return template?.id
      })

    if (!templateId) {
      return {
        statusCode: 200,
        body: 'No email template found',
      }
    }

    await updateTrackingCodeRecord(orderTrackingCode, {status: orderStatus, ...orderResult.body})

    const host = extractHostFromContext(context)

    await sendgridMail.send({
      to: email,
      templateId,
      dynamicTemplateData: {
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
