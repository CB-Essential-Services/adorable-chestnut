import React from 'react';
import TransferForm from '../components/TransferForm';

import {Layout} from '../components/index';

export default class Landing extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer">
                <div style={{width: '55%', maxWidth: '40rem', margin: '0 auto'}}>
                <h1>Transfer LEI</h1>
                <p>Move a registered Legal Entity Identifer under our management.</p>
                    <TransferForm />
                </div>
                </div>
            </Layout>
        );
    }
}