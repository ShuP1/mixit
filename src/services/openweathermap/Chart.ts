import moment from 'moment'
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
// tslint:disable-next-line: no-empty
  renderChart(a: any, b: any) { },
  chartData: undefined,
  mounted () {
    this.renderChart(this.chartData, {
      responsive: true, maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: 'white'
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'series',
          ticks: {
            fontColor: 'white',
            source: 'data',
            autoSkip: true,
            maxRotation: 0,
            autoSkipPadding: 5
          },
          time: {
            displayFormats: {
              hour: 'HH[h]'
            }
          }
        }],
        yAxes: [{
          id: 'y-axis-temp',
          display: true,
          position: 'left',
          ticks: {
            fontColor: 'white'
          }
        },{
          id: 'y-axis-rain',
          display: true,
          position: 'right',
          ticks: {
            fontColor: 'white',
            beginAtZero: true,
            suggestedMax: 1
          }
        }]
      },
      tooltips: {
        intersect: false,
        callbacks: {
          title(tooltipItem: any, myData: any) {
            const item = myData.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index]
            return moment(item.x || item.t).format('HH[h]')
          },
          label(tooltipItem: any, myData: any) {
            let label = myData.datasets[tooltipItem.datasetIndex].label || ''
            if (label) {
              label += ': '
            }
            label += tooltipItem.value
            return label
          }
        }
      }
    })
  }
}
