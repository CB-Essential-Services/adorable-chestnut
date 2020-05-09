import qs from 'querystring'
import sendgridMail from './helpers/sendgridMail'
import sendgridClient from './helpers/sendgridClient'
import extractHostFromContext from './helpers/extractHostFromContext'
import {findTrackingCode, setStatusForTrackingCode} from './helpers/jsonbin'

export async function handler(event, context) {
  try {
    const {orderTrackingCode, orderStatus} = qs.parse(event.body)
    console.log(orderTrackingCode, orderStatus)
    const {email, status: originalStatus} = await findTrackingCode(orderTrackingCode)
    console.log(email)
    console.log(originalStatus)

    if (!email) {
      throw new Error('No email address found for order')
    }

    if (originalStatus === orderStatus) {
      return {
        statusCode: 200,
        body: 'Status already handled',
      }
    }

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

    await setStatusForTrackingCode(orderStatus, orderTrackingCode)

    const host = extractHostFromContext(context)

    await sendgridMail.send({
      to: email,
      templateId,
      dynamicTemplateData: {
        code: orderTrackingCode,
        status: orderStatus,
        link: `${host}/status?orderTrackingCode=${orderTrackingCode}`,
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
