import React from 'react';
import axios from 'axios';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow } from 'mdbreact';
import { Bar, Pie, Line } from 'react-chartjs-2';
import decodeJwt from 'jwt-decode';
export default class Average2 extends React.Component {
  componentDidMount() {
    var token = localStorage.getItem("jwt");
    var decode = decodeJwt(token);
    axios.get('http://192.168.2.87:1337/opinions?rater_id=' + decode.id + '/').then(res => {
      var columnsIn = res.data[0];
      var arr = [];
      for (var key in columnsIn) {
        arr.push(key);
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "updated_at" || arr[i] === "id" || arr[i] === "rater_id" || arr[i] === "user_id" || arr[i] === "created_at" || arr[i] === "attitude" || arr[i] === "communication" || arr[i] === "guidance" || arr[i] === "leadership" || arr[i] === "office_ethics" || arr[i] === "problem_solving" || arr[i] === "punctuality" || arr[i] === "quality_of_work" || arr[i] === "relation_with_others" || arr[i] === "client_serving" || arr[i] === "time_management") {
          arr.splice(i, 1);
          i--;
        }
      }
      var today = new Date();
      var currentMonth;
      if ((today.getMonth() + 1) < 10) {
        currentMonth = "0" + today.getMonth() + 1;
        var minDate = today.getFullYear() + '-' + currentMonth + '-' + "01";
      } else {
        var minDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + "01";
      }
      if ((today.getMonth()) == 0) {
        var minLastDate = (today.getFullYear() - 1) + '-' + "12" + '1';
      } else {
        var minLastDate = today.getFullYear() + '-' + (currentMonth - 1) + '-' + "01";
      }


      if ((today.getMonth() + 1) == 12) {
        var maxDate = (today.getFullYear() + 1) + '-' + "01" + '-' + "01";
      } else {
        maxDate = today.getFullYear() + '-' + (today.getMonth() + 2) + '-' + "01";
      }
      var update_date = [];
      var avg = [];
      var lastavg = [];
      let res_data = res.data;
      for (let a = 0; a < arr.length; a++) {
        let total = 0;
        let
          count = 0;
        for (let i = 0; i < res_data.length; i++) {
          update_date[i] = res.data[i].updated_at;

          if (res_data[i][arr[a]] !== null) {
            if (update_date[i] >= minDate && update_date[i] < maxDate) {

              total = total + res.data[i][arr[a]];
              count = count + 1;
            }
          }
        }
        avg[a] = total / count;
      }
      for (let a = 0; a < arr.length; a++) {
        let total = 0;
        let
          count = 0;
        for (let i = 0; i < res_data.length; i++) {
          update_date[i] = res.data[i].updated_at;

          if (res_data[i][arr[a]] !== null) {
            if (update_date[i] >= "2020-01-02" && update_date[i] < "2020-01-03") {

              total = total + res.data[i][arr[a]];
              count = count + 1;
              // console.log('res_data', arr[a], 'res_value :', res_data[i][arr[a]], 'count', count);
            }
          }
        }
        lastavg[a] = total / count;
      }
      localStorage.setItem("average", JSON.stringify(avg));
      localStorage.setItem("lastAverage", JSON.stringify(lastavg));
      localStorage.setItem("arr", JSON.stringify(arr));
      this.setState({ opinions: res.data });
    });
  }

  render() {
    var retrievedData = localStorage.getItem("arr");
    var avg = localStorage.getItem("average");
    var lastavg = localStorage.getItem("lastAverage");
    var labelarray = JSON.parse(retrievedData);
    var averagedata = JSON.parse(avg);
    var lastavg2 = JSON.parse(lastavg);


    const dataLine = {
      labels: labelarray,
      datasets: [
        {
          label: 'This month',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: averagedata,
        },
        {
          label: 'Last month',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(105, 0, 132, .2)',
          borderColor: 'rgba(255, 0, 0, 0.8)',
          borderCapStyle: 'buttlabelarray',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255, 0, 0, 0.8)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255, 0, 0, 0.8)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 5,
          data: lastavg2,
        }

      ]
    };
    const dataBar = {
      labels: labelarray,
      datasets: [
        {
          label: 'Ratings',
          data: averagedata,
          backgroundColor: 'rgba(179, 102, 255, 0.5)',
          borderWidth: 2,
        }
      ]
    };
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      width: 300,
      scales: {
        xAxes: [{
          barPercentage: 0.5,
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }],
        yAxes: [{
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    const dataPie = {
      labels: labelarray,
      datasets: [
        {
          data: averagedata,
          backgroundColor: ['#ff4d4d', '#cc6600', '#00cc99', '#949FB1', ' #9933ff', '#669900', '#ff3333', '#6600ff', '#0099cc', '#993300', '#006622', '#b30086', '#b32400', '#4d0099', '#006666', ' #4d1a00'],
          hoverBackgroundColor: ['#ffcccc', '#ffcc99', '#99ffe6', '#A8B3C5', '#cc99ff', '#ccff66', '#ff9999', '#944dff', '#66d9ff', '#e64d00', '#00b33c', '#ff1ac6', '#ff471a', '#9933ff', '#00b3b3', '#ff5500']
        }
      ]
    }
    return (
      <div className="chartSection">
        <MDBRow className="mb-4" >
          <div className="lineChart">
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardHeader>Line chart</MDBCardHeader>
                <br></br>
                <MDBCardBody>
                  <Line data={dataLine} height={100} options={{ responsive: true }} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </div>
          <div className="pieChart">
            <MDBCard className="mb-4">
              <MDBCardHeader>Pie chart</MDBCardHeader>
              <br></br>
              <MDBCardBody>
                <Pie data={dataPie} height={280} options={{ responsive: true }} />
              </MDBCardBody>
            </MDBCard>
          </div>

          <div className="barGraph">
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardHeader>Bar Graph</MDBCardHeader>
                <br></br>
                <MDBCardBody>
                  <Bar data={dataBar} height={450} options={barChartOptions} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </div>

        </MDBRow>
      </div>
    )
  }
}