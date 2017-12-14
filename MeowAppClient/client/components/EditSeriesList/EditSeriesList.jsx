import React from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import style from './EditSeriesList.css';
var Config = require('Config');

export default class EditSeriesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            addSerie: ""
        };
    }

    componentDidMount() {
        this.cancelToken = axios.CancelToken.source();
        axios.get(Config.seriesUrl, {
            cancelToken: this.cancelToken.token
        })
            .then(response => {
                var series = response.data;
                this.setState({
                    series: series
                });
            })
            .catch(err => {
                if (!axios.isCancel) {
                    throw (err);
                }
            });
    }

    componentWillUnmount() {
        this.cancelToken.cancel();
    }

    updateAddSerie(event) {
        this.setState({
            addSerie: event.target.value
        });
    }

    deleteSerie(serie) {
        let seriesIndex = this.state.series.indexOf(serie);
        var tempSeries = this.state.series;
        tempSeries.splice(seriesIndex, 1);
        axios.delete(Config.seriesUrl, {
            "data": {
                "serie": serie
            }
        })
            .then(response => {
                this.setState({
                    series: tempSeries
                });
            })
            .catch(err => {
                if (!axios.isCancel) {
                    throw (err);
                }
            });
    }

    addSerie() {
        if (this.state.addSerie != "") {
            var tempSeries = this.state.series;
            tempSeries.push(this.state.addSerie);
            axios.post(Config.seriesUrl, {
                "serie": this.state.addSerie
            })
                .then(response => {
                    this.setState({
                        series: tempSeries,
                        addSerie: ""
                    });
                })
                .catch(err => {
                    if (!axios.isCancel) {
                        throw (err);
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <div className="edit-series-list-wrapper">
                    <input className="add-series" value={this.state.addSerie} onChange={this.updateAddSerie.bind(this)} placeholder="Enter Serie's Name" />
                    <img className="add-button" type="image" src={require("../../assets/images/add.png")} data-tip="Add Serie" value="" onClick={this.addSerie.bind(this)} />
                    <ReactTooltip />
                </div>
                <div className="series-names-list">
                    {
                        this.state.series.map((serie) => {
                            return (
                                <div className="series-name" key={this.state.series.indexOf(serie)}>
                                    <div className="series-name-button">
                                        <img className="delete-button" type="image" src={require("../../assets/images/x-button.png")} data-tip="Remove" value="" onClick={this.deleteSerie.bind(this, serie)} />
                                        <ReactTooltip />
                                    </div>
                                    <div className="series-name-description">
                                        {serie}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}