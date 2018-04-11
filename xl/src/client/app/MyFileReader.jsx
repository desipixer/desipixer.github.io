import React from 'react';
import { render } from 'react-dom';

export default class MyFileReader extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div>
                Upload File : <input type="file" onChange={this.props.onChange}  />
            </div>
        )
        
    }
}