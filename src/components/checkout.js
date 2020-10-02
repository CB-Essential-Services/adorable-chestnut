import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { navigate } from 'gatsby-link'

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
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
      lineItems: [{ price: "price_1Gva5YAeKYVunD5viRkFzoR7", quantity: 1 }],
      successUrl: `http://localhost:8000/thanks/`,
      cancelUrl: `http://localhost:8000/404`,
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
<form name="transferlei" method="POST" data-netlify="true" id="transfer-lei" class="transferlei">
    <p class="form-row">
        <label id="transfer-lei-name-label" for="transfer-lei-name" class="form-label">Name</label>
        <input type="text" name="name" id="transfer-lei-name" aria-labelledby="transfer-lei-name-label" class="form-input" />
    </p>
    <p class="form-row">
        <label id="transfer-lei-email-label" for="transfer-lei-email" class="form-label">Email address</label>
        <input type="email" name="email" id="transfer-lei-email" aria-labelledby="transfer-lei-email-label" class="form-input" />
    </p>
    <p class="form-row form-submit">
        <button type="submit" class="button" disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}>Pay</button>
    </p>
</form>
  )
}

export default Checkout