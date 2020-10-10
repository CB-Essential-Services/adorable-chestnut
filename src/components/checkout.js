import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

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
  };

  const {
    handleSubmit,
  } = ({
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = async (values) => {};

  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  return (    
<form
    name="transfer"
    method="POST"
    content-type= "application/x-www-form-urlencoded"
    data-netlify-honeypot="bot-field"
    data-netlify="true"
    id="transfer"
    className="transfer"
    onSubmit={handleSubmit}
>
    <p className="screen-reader-text">
        <label>Don't fill this out if you're human: <input name="bot-field" onChange={handleChange}/></label>
    </p>
    <p className="form-row">
        <label htmlFor="transfer-name" className="form-label">Name</label>
        <input type="text" name="name" id="transfer-name" className="form-input" onChange={handleChange}/>
    </p>
    <p className="form-row">
        <label htmlFor="transfer-email" className="form-label">Email address</label>
        <input type="email" name="email" id="transfer-email" className="form-input" onChange={handleChange} />
    </p>
    <input type="hidden" name="transfer" value="transfer" />
    <p className="form-row form-submit">
        <button type="submit" className="button" 
        disabled={loading}
      onClick={redirectToCheckout}>
          Pay
          </button>
    </p>
</form>
  )
}

export default Checkout