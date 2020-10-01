import React from 'react';

import {Layout} from '../components/index';
import LookupForm from '@bit/mcb-11561.lei.lookup-form';

export default class Landing extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer">
                <div style={{width: '55%', maxWidth: '40rem', margin: '0 auto'}}>
                <h3>Welcome</h3>
                <p>Search any LEI from all over the stupid globe 😁</p>
                    <LookupForm />
                </div>
                </div>
            </Layout>
        );
    }
}