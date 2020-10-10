import React from "react";
import { navigate } from 'gatsby-link';
import { loadStripe } from "@stripe/stripe-js";

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_RlvibjeKdvwY81acv2YLwvTM00I3UsWXIi")
  }
  return stripePromise
};

  const redirectToCheckout = async event => {
    event.preventDefault()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems: [{ price: "price_1Gva5YAeKYVunD5viRkFzoR7", quantity: 1 }],
      successUrl: `http://localhost:8000/thanks/`,
      cancelUrl: `http://localhost:8000/404`,
    });

    if (error) {
      console.warn("Error:", error)
    }
  };

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Checkout() {
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
    .then(() => console.log(`OK`)) // navigate to desired page
      .catch((error) => alert(error))
  };

  return (
      <form
        name="transfer"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="transfer" />
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
        <button type = "submit" onClick={redirectToCheckout.bind(this)}>Pay</button>
        </p>
      </form>
  )
}