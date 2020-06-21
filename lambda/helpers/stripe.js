import Stripe from 'stripe'

const {STRIPE_SECRET_KEY, STRIPE_PLAN_ID} = process.env
const stripe = Stripe(STRIPE_SECRET_KEY)

export default stripe
