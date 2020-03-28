import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReactTooltip from 'react-tooltip'
import moment from 'moment';
import Serie from '../Serie/Serie.jsx';
import style from './SeriesList.css';
var Config = require('Config');

export default class SeriesList extends React.Component {
    constructor(props) {
        super(props);

        this.allSeries = [];
        this.filteredSeries = [];
        this.state = {
            filteredAndSortedSeries: [],
            filterStartDate: moment().subtract(7, "days").startOf('day'),
            filterEndDate: moment().add(7, "days").startOf('day'),
            filterAllDates: false,
            filterSeiresName: ""
        };
    }

    componentDidMount() {
        this.cancelToken = axios.CancelToken.source();
        axios.get(Config.seriesDataUrl, {
            cancelToken: this.cancelToken.token
        })
            .then(response => {
                this.allSeries = response.data;
                this.filterSeries(this.state);
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

    orderSeries() {
        return [...this.filteredSeries].sort((first, second) => {
            let firstAirDate = moment(first.airDate, 'DD/MM/YYYY');
            let secondAirDate = moment(second.airDate, 'DD/MM/YYYY');
            let isSameDate = firstAirDate.isSame(secondAirDate);
            let isBeforeDate = secondAirDate.isBefore(firstAirDate);
            let isSameName = first.serieName == second.serieName;
            let isBeforeName = first.serieName > second.serieName;
            let isBeforeEpisode = first.seasonAndEpisode > second.seasonAndEpisode;
            if ((!firstAirDate.isValid() && secondAirDate.isValid()) ||
                (!firstAirDate.isValid() && !secondAirDate.isValid() && isBeforeName) ||
                (!firstAirDate.isValid() && !secondAirDate.isValid() && isSameName && isBeforeEpisode) ||
                (isBeforeDate) || (isSameDate && isBeforeName) ||
                (isSameDate && isSameName && isBeforeEpisode)) {
                return 1;
            }
            else {
                return -1;
            }
        });
    }

    filterSeries(newState) {
        var filteredSeries = this.allSeries;
        this.filteredSeries = filteredSeries.filter((serie) => {
            var nameFilter = true;
            var dateFilter = true;
            if (newState.filterSeiresName != "") {
                nameFilter = (serie.serieName.toLowerCase().startsWith(newState.filterSeiresName.toLowerCase()));
            }
            if (!newState.filterAllDates) {
                dateFilter = moment(serie.airDate, 'DD/MM/YYYY').isBetween(newState.filterStartDate, newState.filterEndDate) ||
                    moment(serie.airDate, 'DD/MM/YYYY').isSame(newState.filterStartDate) ||
                    moment(serie.airDate, 'DD/MM/YYYY').isSame(newState.filterEndDate);
            }
            return (nameFilter && dateFilter);
        });
        let filteredAndSortedSeries = this.orderSeries();
        Object.assign(newState, { filteredAndSortedSeries: filteredAndSortedSeries });
        this.setState(newState);
    }

    filterStartDate(date) {
        let filterStartDate = date;
        let newState = Object.assign({}, this.state, { filterStartDate: filterStartDate });
        this.filterSeries(newState);
    }

    filterEndDate(date) {
        let filterEndDate = date;
        let newState = Object.assign({}, this.state, { filterEndDate: filterEndDate });
        this.filterSeries(newState);
    }

    filterSeriesName(event) {
        let filterSeiresName = event.target.value;
        let newState = Object.assign({}, this.state, { filterSeiresName: filterSeiresName });
        this.filterSeries(newState);
    }

    filterAllDates(event) {
        let filterAllDates = !this.state.filterAllDates;
        let newState = Object.assign({}, this.state, { filterAllDates: filterAllDates });
        this.filterSeries(newState);
    }

    render() {
        return (
            <div>
                <div className="filters-wrapper">
                    <input className="filter all-dates" type="checkbox" data-tip="All Times" value={this.state.filterAllDates} onChange={this.filterAllDates.bind(this)} />
                    <div className="filter" data-tip="From">
                        <DatePicker className="date-picker"
                            selected={this.state.filterStartDate}
                            selectsStart
                            startDate={this.state.filterStartDate}
                            endDate={this.state.filterEndDate}
                            onChange={this.filterStartDate.bind(this)}
                            disabled={this.state.filterAllDates}
                        />
                    </div>
                    <div className="filter" data-tip="To">
                        <DatePicker className="date-picker"
                            selected={this.state.filterEndDate}
                            selectsEnd
                            startDate={this.state.filterStartDate}
                            endDate={this.state.filterEndDate}
                            onChange={this.filterEndDate.bind(this)}
                            disabled={this.state.filterAllDates}
                        />
                    </div>
                    <input className="filter search-series" value={this.state.filterSeiresName} onChange={this.filterSeriesName.bind(this)} placeholder="Filter By Series Name" />
                    <ReactTooltip />
                </div>
                <table className="series-list-grid">
                    <tbody>
                        {
                            this.state.filteredAndSortedSeries.map((serie) => {
                                return <Serie serie={serie} key={serie.serieId + serie.seasonAndEpisode} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}