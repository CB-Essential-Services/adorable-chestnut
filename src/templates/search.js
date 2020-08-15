import React from 'react';

import {Layout} from '../components/index';
import LookupForm from '@bit/mcb-11561.lei.lookup-form';

export default class Landing extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer">
                    <LookupForm />
                </div>
            </Layout>
        );
    }
}