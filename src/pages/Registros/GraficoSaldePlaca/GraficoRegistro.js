import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";

const url = "http://192.168.4.50:5000/api/Reiniciacoes";
const colors = ["#78ce90", "#b977ce", "#fac76e", "#de4d4d"];
const data = {
  labels: ["10/10", "11/10", "12/10", "13/10", "14/10", "15/10", "16/10"],
  datasets: [
    {
      label: "",
      fill: false,
      lineTension: 0.09,
      backgroundColor: colors,
      borderColor: "rgba(75,192,192,1)",
      // borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // pointBorderColor: "rgba(75,192,192,1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const getOptions = (showLabelX, showLabelY) => {
  return {
    legend: {
      display: true,
      position: "right"
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true
          },
          ticks: {
            display: showLabelX ? true : false,
            minRotation: 0
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true
          },
          ticks: {
            display: showLabelY ? true : false,
            minRotation: 90
          }
        }
      ]
    }
  };
};

export default class GraficoRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsRelatorioResets: [],
      dataRelatorioResets: [],
      legendaGrafico: []
    }
  }

  formataData(data) {
    var d = new Date(data);
    return d.toLocaleString().replace(' 00:00:00', '');
  }

  componentDidMount() {
    axios.get(Url + 'SaldePlaca')
      .then(data => {
        data.data.map((item) => {
          this.state.labelsRelatorioResets.push(this.formataData(item.date))
        })

        line.labels = this.state.labelsRelatorioResets;

        data.data.map((item) => {
          this.state.dataRelatorioResets.push(item.count)
        })
        

        line.datasets[0].data = this.state.dataRelatorioResets;


        //this.setState({ legendaGrafico: this.state.labelsRelatorioResets.reverse() });
      });
  }

  render() {
    const options = getOptions(this.state.showLabelX, this.state.showLabelY);

    return (
      <div>
        <h2>Line Example</h2>
        <Line redraw={true} ref="chart" data={data} options={options} />
      </div>
    );
  }
}
