import React from "react";
import { Line } from "react-chartjs-2";

function getDate() {
  var tempDate = new Date();
  var date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getDate();
  const currDate = date;
  return <p>{currDate}</p>;
}

const url =
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3Ctimestamp%20%27" +
  getDate().props.children +
  "%2017%3A00%3A00%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Tanggal%20asc&outSR=102100&resultOffset=0&resultRecordCount=2000&cacheHint=true";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    };
  }
  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const res = result.features;
        let tgl = [];
        let date = [];
        let jmlKasus = [];
        res.forEach(element => {
          tgl.push(
            new Date(element.attributes.Tanggal).toLocaleString(["ban", "id"], {
              month: "short",
              day: "numeric"
            })
          );
          jmlKasus.push(element.attributes.Jumlah_Kasus_Kumulatif);
        });
        this.setState({
          Data: {
            labels: tgl,
            datasets: [
              {
                label: "Jumlah Kasus",
                data: jmlKasus,
                fill: false,
                lineTension: 0.1,
                borderColor: "#ee3535",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,

                pointBorderColor: "#ee3535",
                pointBackgroundColor: "#ee3535",
                pointBorderWidth: 6,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#ee3535",
                pointHoverBorderColor: "#ee3535",
                pointHoverBorderWidth: 2,
                pointRadius: 1
              }
            ]
          }
        });
      });
  }
  render() {
    return (
      <div>
        <Line
          data={this.state.Data}
          options={{
            legend: {
              display: true,
              position: "top"
            }
          }}
        />
      </div>
    );
  }
}