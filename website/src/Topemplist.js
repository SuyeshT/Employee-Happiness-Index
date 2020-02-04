import React, { Component } from 'react';
import axios from 'axios';
import CardHeader from '@material-ui/core/CardHeader';
import { Pagination, List } from 'react-admin';
import * as constant from './constant';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;
export class Topemplist extends Component {
  data = [];
  finalData = [];
  myJsonString = {};
  object1=[];
  topfiveRes;
  result = [];
  constructor() {
    super();
    this.state = {
      finalData2:[],
    };
  }
  componentDidMount() {
      axios.get(constant.UserAPI + "?_sort=id:ASC").then(res => {
        for(var i=0;i<res.data.length;i++){
            axios.get(constant.OpinionsAPI + "?rater_id=" + res.data[i].id).then(res => {
              var name = "";
        for(var i=0;i<res.data.length;i++){
          console.log("abc",res.data[i].rater_id.fullName);
          name=res.data[i].rater_id.fullName;
        }
        var arr = [];
        var key;
        var sum = 0;
        var sumrating = 0;
        var avgrating = 0;
        var count = 0;
        res.data.forEach(function (obj) {
          if (count == 0) {
            for (key in obj.rating) {
              arr.push(key);
            }
            count += 1;
          }
           else {
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

          for (var j=0;j<res.data.length;j++){
            update_date[j] = res.data[j].updated_at;
            console.log("update",res.data[j].updated_at);
          for(var i=0;i<arr.length;i++){
            if (update_date[i] >= minDate && update_date[i] < maxDate) {
            if(res.data[j].rating[arr[i]] != undefined){
            sum =sum +1;
            sumrating = sumrating + res.data[j].rating[arr[i]];
            }
          }
          }
        }
        avgrating = (sumrating/sum).toFixed(1);
        if(avgrating !== "NaN"){
          this.object1.push({name:name,average:avgrating});
        }
        this.object1.sort((a, b) => (a.average < b.average) ? 1 : -1);
        this.topfiveRes = this.object1;
        var arr = [];
        console.log("hi ",arr);
        arr = this.object1.slice(0, 5);
        this.setState({finalData2:arr});
        console.log('datttaaagfrdsgrd -- ',this.state.finalData2);
        });
      }  
    });
  }
  render() {
    var name;
    console.log('datttaaa -- ',this.finalData);
    return (
      <React.Fragment>
        <div className='chartSection' pagination={<PostPagination />}>
        <center><p className='heading'>Top employees of this month.!</p></center>
        {this.state.finalData2.map(Final =>
          <div className='commcard'><p style={{ fontSize: 25, textTransform: 'capitalize' }}>{Final.name}</p><p style={{ fontSize: 18 }} >Rating: <span >  {Final.average}</span> </p></div>
        )}
        </div>
      </React.Fragment>
    )
  }
}

export default Topemplist;