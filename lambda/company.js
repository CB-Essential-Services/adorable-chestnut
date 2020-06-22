const API_TOKEN = ''
const openCorporates = require('opencorporates')(API_TOKEN)

export async function handler(event, context) {
  try {
    const params = event.queryStringParameters

    const companyNumber = params.number
    const jurisdictionCode = params.jurisdiction.toLowerCase().replace('-', '_')

    const company = await openCorporates.companies.get(
      jurisdictionCode,
      companyNumber
    )

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({error: true}),
    }
  }
}
