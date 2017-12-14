import React from 'react';
import EditSeriesList from '../EditSeriesList/EditSeriesList.jsx'

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: []
        };
    }
    
    componentDidMount() {
    }

    render() {
        return (
            <div><EditSeriesList/></div>
        );
    }
}