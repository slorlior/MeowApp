import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Favicon from 'react-favicon';
import SeriesList from '../SeriesList/SeriesList.jsx';
import Settings from '../Settings/Settings.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Icon from '../Icon/Icon.jsx';
import style from './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Favicon url={require("../../assets/images/favicon.ico")} />
                <Router>
                    <div>
                        <div className="navbar">
                            <Icon className="icon" />
                            <Link to="/">Schedule</Link>
                            <Link to="/settings">Settings</Link>
                        </div>
                        <Switch>
                            <Route exact path="/" component={SeriesList} />
                            <Route path="/settings" component={Settings} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}