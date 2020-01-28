import React from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';


export default class Feedback extends React.Component {
  state = {
    userdata: [],
  };
  componentDidMount() {
    var token = localStorage.getItem("user_id");

    axios.get('http://192.168.2.87:1337/opinions?user_id=' + token + '/').then(res => {
      var today = new Date();
      var currentMonth;
      var minDate;
      var maxDate;
      if ((today.getMonth() + 1) < 10) {
        currentMonth = "0" + parseInt(today.getMonth() + 1);
        minDate = today.getFullYear() + '-' + currentMonth + '-01';
      } else {
        minDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-01';
      }
      if ((today.getMonth() + 1) == 12) {
        maxDate = (today.getFullYear() + 1) + '-01-01';
      } else {
        maxDate = today.getFullYear() + '-' + (today.getMonth() + 2) + '-01';
      }
      var raterArray = [];
      var obj = res.data;
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].updated_at >= minDate && obj[i].updated_at < maxDate) {

          raterArray[i] = obj[i].rater_id.id;
        }
      }
      var uniqueArray = [];
      for (var j = 0; j < raterArray.length; j++) {
        if (uniqueArray.indexOf(raterArray[j]) == -1) {
          uniqueArray.push(raterArray[j]);
        }
      }
      localStorage.setItem('raterArray', JSON.stringify(uniqueArray));
    });
    axios.get('http://192.168.2.87:1337/users').then(res => {
      var raterArray = [];
      var dataarray = [];
      // console.log('raternmae ',dataarray);
      raterArray = JSON.parse(localStorage.getItem("raterArray"));
      var obj = res.data;
      if (raterArray != 0 && raterArray != null) {
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < raterArray.length; j++) {
            if (!raterArray.includes(obj[i].id)) {
              dataarray[i] = (obj[i]);
            }
          }
        }

        this.setState({ userdata: dataarray });
      } else {
        this.setState({ userdata: obj });
      }
    });
  }

  raterkeyword(Raterid, RaterfullName, Raterusername, RaterDesignation, Raterreportername) {
    localStorage.setItem('RaterDesignation', RaterDesignation);
    localStorage.setItem('rater_id', Raterid);
    localStorage.setItem('rater_name', Raterusername);
    localStorage.setItem('Raterreportername', Raterreportername);
    localStorage.setItem('RaterfullName', RaterfullName);
  }
  empdetail(empid, classes, handleClick, handleClose, open, id) {

    localStorage.setItem('emp_id', empid);
  }
  render() {
    return (
      <React.Fragment>
        <div className='chartSection'>
          <div className='feedbackcontainer'>
            <center><p className='heading'> Select Name to Give Feedback.</p></center>
            <br></br>
            <Grid container>
              <Grid className='feedbackbox'>
                <div>
                  <pre>
                    <p className='usernamehead btn'>Full Name</p>
                    <a className='btn feedbackhead'> Give Feedback</a>
                    <hr></hr>
                  </pre>
                  <br></br>
                  <div>{this.state.userdata.map(User =>
                    <pre key={User.id} >{localStorage.getItem("user_id") != (User.id) ?
                      <div className='feedback'>
                        <a className='username btn'
                          onMouseOver={() => this.empdetail(User.id)}
                          style={{ textTransform: 'capitalize' }}>
                          {User.fullName}
                        </a>
                        <a href="/Userfeedback" className='btn btn-primary feedbackbtn' onClick={() => this.raterkeyword(User.id, User.fullName, User.username, User.empdesignation.designation, User.reporter_name.username)}>
                          Feedback
                      </a>
                      </div>
                      :
                      <p></p>
                    }
                    </pre>
                  )}
                  </div>
                </div>
                <br></br>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment >
    );
  }
}