import React from 'react';

import {Layout} from '../components/index';
import Checkout from '../components/checkout';

export default class Landing extends React.Component {
    state = {
        name: '',
        email: '',
        message: ''
      };
      handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
      };
      encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
      }
      handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.encode({ 'form-name': 'contactForm', ...this.state })
        }
  
        fetch(
          "/",
          options
        )
        .then(function (response) {
          window.location.assign('/thanks/');
        })
        .catch(function (error) {
          console.log(error);
        });
      };
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer">
                <div style={{width: '55%', maxWidth: '40rem', margin: '0 auto'}}>
                <h1>Transfer LEI</h1>
                <p>Move a registered Legal Entity Identifer under our management.</p>
                    <Checkout />
                </div>
                </div>
            </Layout>
        );
    }
}