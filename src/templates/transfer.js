import React from 'react';
import Checkout from '../components/checkout';

import {Layout} from '../components/index';

export default class Landing extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer">
                <div style={{width: '55%', maxWidth: '40rem', margin: '0 auto'}}>
                    <h1>LEIeXtension</h1>
                <p>Move a registered Legal Entity Identifer under our management.</p>
                    <Checkout />
                </div>
                </div>
            </Layout>
        );
    }
}