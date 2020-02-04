import React from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import * as constant from './constant';
import Pagination from "./components/Pagination";
import CardHeader from '@material-ui/core/CardHeader';

export default class Feedback extends React.Component {
  state = {
    userdata: [],
    allNames: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null,

  };
  componentDidMount() {
    var token = localStorage.getItem("user_id");

    axios.get(constant.OpinionsAPI + '?user_id=' + token + '/').then(res => {
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
        if (new Date(obj[i].updated_at) >= new Date(minDate) && new Date(obj[i].updated_at) < new Date(maxDate)) {
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
      raterArray = JSON.parse(localStorage.getItem("raterArray"));
      var obj = res.data;
      for (var rm = 0; rm < obj.length; rm++) {
        if (obj[rm].id == localStorage.getItem("user_id")) {
          obj.splice(rm, 1);
        }
      }
      if (raterArray != 0 && raterArray != null && raterArray.length != 0) {
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < raterArray.length; j++) {

            if (!raterArray.includes(obj[i].id)) {
              dataarray[i] = (obj[i]);
            }
          }
        }
        dataarray = dataarray.filter(function (entry) { return /\S/.test(entry); });
        this.setState({ userdata: dataarray });
        const allNames = this.state.userdata;
        this.setState({ allNames });
      } else {
        this.setState({ userdata: obj });
        const allNames = this.state.userdata;
        this.setState({ allNames });
      }
    });

  }
  onPageChanged = data => {
    const { allNames } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allNames.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentCountries, totalPages });
  };

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

    const {
      allNames,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    const totalCountries = allNames.length;
    var display = false;
    // if (totalCountries === 0) return null;
    if (totalCountries === 0) {
      display = true;
    }
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <React.Fragment>
        <div className='chartSection'>
          <div className='feedbackcontainer'>
            {display === false && <center><p className='heading'>Select Name to Give Feedback.</p></center>}
            <br></br>
            {display === true && <center><p className='heading'>You have given feedback to all the Employees.</p></center>}
            {display === false &&
              <Grid container>
                <Grid className='feedbackbox'>
                  <div>
                    <pre>
                      <p className='usernamehead btn'>Full Name</p>
                      <a className='btn feedbackhead'> Give Feedback</a>
                      <hr></hr>
                    </pre>
                    <div className="feedbackcontainers">
                      <div className="row d-flex flex-row py-5">
                        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>{currentCountries.map(User =>
                              <pre key={User.id} >
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
                              </pre>
                            )}
                            </div>


                            {currentPage && (
                              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                                <span className="font-weight-bold">{totalPages}</span>
                              </span>
                            )}
                          </div>
                          <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                              totalRecords={totalCountries}
                              pageLimit={10}
                              pageNeighbours={0}
                              onPageChanged={this.onPageChanged}
                            />
                          </div>
                        </div>
                        <br></br>

                      </div>
                    </div>
                  </div>
                  <br></br>
                </Grid>
              </Grid>}
          </div>
        </div >
      </React.Fragment >
    );
  }
}