require('dotenv-flow').config({path: '../'})

import qs from 'querystring'
import fetch from 'node-fetch'
import _ from 'lodash'
const RAPID_LEI_TOKEN = process.env.RAPID_LEI_TOKEN
const RAPID_LEI_HOST = process.env.RAPID_LEI_HOST
const RAPID_LEI_ID = process.env.RAPID_LEI_ID

import countryLookup from 'country-code-lookup'
import stateCodes from 'us-state-codes'

// const rapidJurisdictions = require('../data/rapidlei/jurisdictions.json')
// const ocJurisdictions = require('../data/opencorporates/jurisdictions.json')

const getRapidLeiHeaders = async () => {
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

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return headers
}

const getJurisdictionsFromRapidLei = async () => {
  const headers = await getRapidLeiHeaders()
  const result = await fetch(`${RAPID_LEI_HOST}/jurisdictions`, {
    headers,
  }).then((r) => r.json())

  const countries = result.countries
    .filter((x) => x.confidenceLevel > 5)
    .map((x) => ({
      value: x.jurisdiction,
      label: countryLookup.byIso(x.jurisdiction).country,
    }))

  const states = result.states
    .filter((x) => x.confidenceLevel > 0 && x.jurisdiction.startsWith('US'))
    .map((x) => ({
      value: x.jurisdiction,
      label: stateCodes.getStateNameByStateCode(x.jurisdiction.split('-')[1]),
    }))

  return {countries, states}
}

export async function handler(event, context) {
  const {countries, states} = await getJurisdictionsFromRapidLei()
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        label: 'States',
        options: states,
      },
      {
        label: 'Countries',
        options: countries,
      },
    ]),
  }
}
