import React from 'react';
import moment from 'moment';
import Clipboard from 'clipboard';
import style from './Serie.css';
var Config = require('Config');

export default class Serie extends React.Component {
    componentDidMount() {
        new Clipboard('.copy' + this.props.serie.serieId + this.props.serie.seasonAndEpisode, {
            target: () => document.getElementById(this.props.serie.serieId + this.props.serie.seasonAndEpisode)
        });
    }

    getColorClass() {
        let airDate = moment(this.props.serie.airDate, 'DD/MM/YYYY');
        if (airDate.isBetween(moment().add(-8, 'days'), moment().add(-1, 'days'))) {
            return "last-week";
        }
        if (airDate.get("year") == moment().get("year") && airDate.get("month") == moment().get("month") && airDate.get("date") == moment().get("date")) {
            return "today";
        }
        if (airDate.isBetween(moment(), moment().add(7, 'days'))) {
            return "next-week";
        }
        return "other";
    }

    render() {
        return (
            <tr className={this.getColorClass() + " " + "copy" + this.props.serie.serieId + this.props.serie.seasonAndEpisode}>
                <td>
                    <span className="hidden-copy-name" id={this.props.serie.serieId + this.props.serie.seasonAndEpisode}>
                        {this.props.serie.fullDisplayName}
                    </span>
                    <img className={"serie-image"} src={this.props.serie.image} />
                </td>
                <td>
                    {this.props.serie.serieName}
                </td>
                <td>
                    {this.props.serie.episodeName}
                </td>
                <td>
                    {this.props.serie.seasonAndEpisode}
                </td>
                <td>
                    {this.props.serie.airDay}
                </td>
                <td>
                    {this.props.serie.airDate}
                </td>
                <td>
                    <a target="_blank" href={Config.torrentSearchUrl + this.props.serie.serieName + " " + this.props.serie.seasonAndEpisode}>
                        RARBG
                    </a>
                </td>
            </tr>
        );
    }
}