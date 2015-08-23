import React, {Component, Proptype} from 'react';

export default class WeeklyReport extends Component {

  componentDidMount() {
    
    // TODO: checkout react-highchart
    $('.highchart').highcharts({
      xAxis: {
        type: 'linear',
        categories: ["yabee", "angry", "sad", "happy", "scared", "peace"]
      },
      yAxis: {
        title: { enabled: false },
        labels: { enabled: false }
      },
      title: { text: '' },
      legend: { enabled: false },
      tooltip: { enabled: false },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            useHTML: true,
            padding: 40,
            formatter: function () {
                        const emo_image = require(`../images/emo_${this.x}.png`);
                        return `<img id="mood" src=${emo_image} />`;
                    }
          }
        },
        column: { groupPadding: 0, borderWidth: 0 }
      },
      series: [{
        type: 'column',
        data: [ {y: 23, color: '#C8FFB2'},
                {y: 12, color: '#FFD1D1'},
                {y: 4,  color: '#F6FFB2'},
                {y: 15, color: '#CFDFFF'},
                {y: 26, color: '#E1D8FF'},
                {y: 7,  color: '#FFE8C4'} ]
      }]
    });
  }
  render() {
    require('./WeeklyReport.scss');
    return (
      <div className="weekly-report container">
        <div className="period center-align">
          <p className="btn">2015 Aug 16th - Aug 23rd</p>
        </div>
        <div className="highchart"></div>
      </div>
    );
  }
}
