import React from 'react';
import { Redirect } from 'react-router-dom';
import SeriesList from '../SeriesList/SeriesList.jsx';
import Settings from '../Settings/Settings.jsx';

export default class NotFound extends React.Component {
    render() {
        return (
            <Redirect from={this.props.location.pathname} to="/" />
        );
    }
}