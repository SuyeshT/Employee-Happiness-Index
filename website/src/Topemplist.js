import React, { Component } from 'react';
import axios from 'axios';
export class Topemplist extends Component {
  data = [];
  finalData = [];
  myJsonString = {};
  object1 = [];
  topfiveRes;
  result = [];
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    axios.get("http://192.168.2.87:1337/users?_sort=id:ASC").then(res => {
      for (var i = 0; i < res.data.length; i++) {
        axios.get("http://192.168.2.87:1337/opinions?rater_id=" + res.data[i].id).then(res => {
          var name = "";
          for (var i = 0; i < res.data.length; i++) {
            name = res.data[i].rater_id.username;
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
          for (var j = 0; j < res.data.length; j++) {
            for (var i = 0; i < arr.length; i++) {
              if (res.data[j].rating[arr[i]] != undefined) {
                sum = sum + 1;
                sumrating = sumrating + res.data[j].rating[arr[i]];
              }
            }
          }
          avgrating = sumrating / sum;
          this.object1.push({ name: name, average: avgrating });
          this.object1.sort((a, b) => (a.average < b.average) ? 1 : -1);
          this.topfiveRes = this.object1;
          var arr = [];
          for (let m = 0; m < this.topfiveRes.length - 6; m++) {
            arr.push(this.topfiveRes[m]);
          }
          this.finalData = arr;
        });
      }
    });
  }

  render() {
    var name;
    console.log('datttaaa -- ', this.finalData);
    // window.location.reload();
    return (
      <div className='commentsSectionbox'>
        {this.finalData.map(Final =>
          <h1>{Final.name}</h1>
        )}
        {name}
      </div>
    )
  }
}

export default Topemplist;