import React from 'react';
import axios from 'axios';
import { MDBCol, MDBCard, MDBCardBody, MDBRow } from 'mdbreact';
import { Bar, Pie, Line } from 'react-chartjs-2';
import decodeJwt from 'jwt-decode';
import * as constant from './constant';

export default class Average extends React.Component {

  componentDidMount() {
    var token = localStorage.getItem("jwt");
    var decode = decodeJwt(token);
    axios.get(constant.API + '/opinions?rater_id=' + decode.id + '/').then(res => {
      var arr = [];
      var key;
      var count = 0;
      res.data.forEach(function (obj) {
        if (count == 0) {
          for (key in obj.rating) {
            arr.push(key);
          }
          count += 1;
        } else {
          for (key in obj.rating) {
            if (!arr.includes(key)) {
              arr.push(key);
            }
          }
        }
      });
     
      var today = new Date();
      var currentMonth;
      var minDate;
      var maxDate;
      if ((today.getMonth() + 1) < 10) {
        currentMonth = "0" + parseInt(today.getMonth() + 1);
        minDate = today.getFullYear() + '-' + currentMonth + '-01' ;
      } else {
        minDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-01' ;
      }
      if ((today.getMonth() + 1) == 12) {
        maxDate = (today.getFullYear() + 1) + '-01-01' ;
      } else {
        maxDate = today.getFullYear() + '-' + (today.getMonth() + 2) + '-01' ;
      }
      var update_date = [];
      var avg = [];
      var lastavg = [];
      let res_data = res.data;
      for (let a = 0; a < arr.length; a++) {
        let total = 0;
        let count = 0;
        for (let i = 0; i < res_data.length; i++) {
          update_date[i] = res.data[i].updated_at;
          if (res_data[i].rating[arr[a]] != null && res_data[i].rating[arr[a]] != undefined) {
            if (update_date[i] >= minDate && update_date[i] < maxDate) {
              total = total + JSON.parse(res.data[i].rating[arr[a]]);
              count = count + 1;
            }
          }
        }
        avg[a] = total / count;
        avg[a] = avg[a].toFixed(1);
      }
      for (let a = 0; a < arr.length; a++) {
        let totalline = 0;
        let countline = 0;
        for (let i = 0; i < res_data.length; i++) {
          update_date[i] = res.data[i].updated_at;
          if (res_data[i].rating[arr[a]] != null && res_data[i].rating[arr[a]] != undefined) {
            if (update_date[i] >= minDate && update_date[i] < maxDate) {
              totalline = totalline + JSON.parse(res.data[i].rating[arr[a]]);
              countline = countline + 1;
              
            }
          }
        }
        lastavg[a] = totalline / countline;
        
      }
     
      var monthavg = 0;
      if (lastavg.legth != 0) {
        for (var j = 0; j < lastavg.length; j++) {
          monthavg += lastavg[j];
        }
      }
      var monthAvg = monthavg / lastavg.length;
      monthAvg = monthAvg.toFixed(1);
      var monthval = parseInt(minDate.slice(5, 8));
      var montharray = [monthAvg, null, null, null, null, null, null, null, null, null, null, null, null];
      
      for (var i = 1; i <= 12; i++) {
        if(monthval == 1){
          montharray[0] = monthAvg; 
        }
        if (monthval == i) {
          montharray[i] = monthAvg;
        }
      }
      var labelarr = arr;
       for(var k=0;k<labelarr.length;k++){
        labelarr[k] = labelarr[k].replace(/_/g, " ");
       }
      localStorage.setItem("average", JSON.stringify(avg));
      localStorage.setItem("lastAverage", JSON.stringify(montharray));
      localStorage.setItem("arr", JSON.stringify(labelarr));
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
    var labelarray2 = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            beginAtZero: true,
            max: 5
          }
        }],
      }
    }
    const dataLine = {
      labels: labelarray2,
      datasets: [
        {
          label: 'Monthwise average',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.9)',
          borderColor: 'rgb(75,192,192)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(75,192,192)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(75,192,192,)',
          pointHoverBorderColor: 'rgb(220,220,220,)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: lastavg2,
        }
      ]
    };
    const dataBar = {
      labels: labelarray,
      datasets: [
        {
          label: 'Average data',
          data: averagedata,
          backgroundColor: 'rgb(75, 105, 187)',
          borderWidth: 2,
        }
      ]
    };
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          barPercentage: 0.5,
          maxBarThickness: 30,
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
            beginAtZero: true,
            max: 5
          }
        }]
      }
    }
    // const pieChartOptions = {
    //   responsive: true,
    //   legend: {
    //     align: 'center',
    //     position: 'right',
    //   }
    // }
    // const dataPie = {
    //   labels: labelarray,
    //   datasets: [
    //     {
    //       data: averagedata,
    //       backgroundColor: ['#ff4d4d', '#cc6600', '#00cc99', '#949FB1', ' #9933ff', '#669900', '#ff3333', '#6600ff', '#0099cc', '#993300', '#006622', '#b30086', '#b32400', '#4d0099', '#006666', ' #4d1a00'],
    //       hoverBackgroundColor: ['#ffcccc', '#ffcc99', '#99ffe6', '#A8B3C5', '#cc99ff', '#ccff66', '#ff9999', '#944dff', '#66d9ff', '#e64d00', '#00b33c', '#ff1ac6', '#ff471a', '#9933ff', '#00b3b3', '#ff5500']
    //     }
    //   ]
    // }
    return (
      <div className="chartSection">
        <MDBRow className="mb-4" >
          <div className="lineChart">
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <Line data={dataLine} height={100} options={lineChartOptions} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </div>
          {/* <div className="pieChart">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <Pie data={dataPie} height={280} options={pieChartOptions} />
              </MDBCardBody>
            </MDBCard>
          </div> */}
          <div className="barGraph">
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <Bar data={dataBar} height={350} width={900} options={barChartOptions} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </div>
        </MDBRow>
      </div>
    )
  }
}
