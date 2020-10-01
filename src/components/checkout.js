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
    <form 
    name="transferLEI" 
    method="post" 
    data-netlify="true" 
    data-netlify-honeypot="bot-field"
    id="transfer-LEI"
    className="transfer-LEI"
    onSubmit={handleSubmit}
  >
    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
    <input type="hidden" name="form-name" value="transferLEI" />
    <p hidden>
      <label>
        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
      </label>
    </p>
    <p>
      <label>
        Your name:
        <br />
        <input type="text" name="name" onChange={handleChange} />
      </label>
    </p>
    <p>
      <label>
        Your email:
        <br />
        <input type="email" name="email" onChange={handleChange} />
      </label>
    </p>
    <p>
      <label>
        Message:
        <br />
        <textarea name="message" onChange={handleChange} />
      </label>
    </p>
    <p>
    <button className="button"
    type="submit"
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}
    >
      Pay
    </button>
    </p>
    </form>
  )
}

export default Checkout