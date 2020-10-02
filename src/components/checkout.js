import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_RlvibjeKdvwY81acv2YLwvTM00I3UsWXIi")
  }
  return stripePromise
}

const Checkout = () => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems: [{ price: "price_1Gva5YAeKYVunD5viRkFzoR7"}],
      successUrl: `http://localhost:8000/thanks/`,
      cancelUrl: `http://localhost:8000/404`,
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  return (    
<form
    name="extend"
    method="POST"
    data-netlify-honeypot="bot-field"
    data-netlify="true"
    id="extend"
    className="extend"
>
    <p className="screen-reader-text">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <p className="form-row">
        <label htmlFor="extend-name" className="form-label">Name</label>
        <input type="text" name="name" id="extend-name" className="form-input" />
    </p>
    <p className="form-row">
        <label htmlFor="extend-email" className="form-label">Email address</label>
        <input type="email" name="email" id="extend-email" className="form-input" />
    </p>
    <input type="hidden" name="form-name" value="extend" />
    <p className="form-row form-submit">
        <button className="button" type="submit" 
      onClick={redirectToCheckout}>
          Pay
          </button>
    </p>
</form>
  )
}

export default Checkout