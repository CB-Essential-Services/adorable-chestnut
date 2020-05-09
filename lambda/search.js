const API_TOKEN = ''
const openCorporates = require('opencorporates')(API_TOKEN)

// export async function handler(event, context) {
//   return {
//     statusCode: 200,
//     body: '',
//   }
// }

export async function handler(event, context) {
  try {
    const params = event.queryStringParameters

    const name = params.name
    const jurisdictionCode = params.jurisdiction.toLowerCase().replace('-', '_')

    const results = await openCorporates.companies.search(name, {
      jurisdictionCode,
      inactive: false,
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(results),
    }
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({error: true}),
    }
  }
}
