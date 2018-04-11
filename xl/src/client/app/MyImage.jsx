import React from 'react';
import { render } from 'react-dom';

export default class MyImage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <img src={this.props.link} onLoad={this.props.onLoad} onError={this.props.onError} />
        )
    }

}