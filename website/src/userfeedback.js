import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import * as constant from './constant';
import axios from "axios";
import decodeJwt from 'jwt-decode';
import Popper from '@material-ui/core/Popper';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class Userfeedback extends React.Component {
  rating = {};
  keywordarray = [];
  error = '';
  anchorEl = null;
  open = false;
  constructor() {
    super();
    this.state = {
      userdata: [],
      errorm: "",
      rating: 0,
      empdata: [],
      postRating: [],
      iserrormessage: false,
      showModal: false,
    };
  }
  componentDidMount() {
    axios.get(constant.Keywordsort).then(res => {

      this.setState({ userdata: res.data });
    });
    axios.get(constant.empdesignationid + localStorage.getItem('userdesignationid')).then(res => {

      localStorage.setItem('empdesignation', res.data[0].designation);
      this.setState({ empdata: res.data });
    });
    axios.get(constant.UserAPI +'?id=' + localStorage.getItem('loggeduserreportid')).then(res => {

      localStorage.setItem('reportto', res.data[0].username);
      this.setState({ empdata: res.data });

    });
    var Rater_Designation = localStorage.getItem('RaterDesignation');
    var empdes = localStorage.getItem('empdesignation');//loggedin user designation
    var raterUsername = localStorage.getItem('rater_name') //selected user
    var loggedreportsto = localStorage.getItem('reportto') //loggedin user reports to 
    var loggedusername = localStorage.getItem('username'); //logged in username
    var raterreportername = localStorage.getItem('Raterreportername'); //clicked rater reports to 

    if (Rater_Designation === empdes && raterUsername === loggedreportsto) { //same designation reports to
      this.keywordarray = [];
      localStorage.removeItem('keywordarray');
      // same designations and also reports to it
      axios.get(constant.EmpdesignationsAPI + '?designation=Reporter').then(res => {

        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }

        this.setState({ userdata: res.data });
      });
    }
    else if (Rater_Designation === empdes && raterUsername !== loggedreportsto) {
      // same designation but does not reports to
      this.keywordarray = [];
      localStorage.removeItem('keywordarray');
      axios.get(constant.EmpdesignationsAPI + '?designation=Employee').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }
        this.setState({ userdata: res.data });
      });

    }
    else if (Rater_Designation !== empdes && raterUsername === loggedreportsto) {
      // different designation but reports to
      this.keywordarray = [];
      localStorage.removeItem('keywordarray');
      axios.get(constant.EmpdesignationsAPI + '?designation=Reporter').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }
        this.setState({ userdata: res.data });
      });
    }
    else if (Rater_Designation === empdes && loggedusername === raterreportername) {
      // same designation same team
      this.keywordarray = [];
      localStorage.removeItem('keywordarray');
      axios.get(constant.EmpdesignationsAPI + '?designation=' + Rater_Designation).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }
        this.setState({ userdata: res.data });
      });
    }
    else if (Rater_Designation !== empdes && loggedusername === raterreportername) {
      // diff designation same team
      this.keywordarray = [];
      localStorage.removeItem('keywordarray');
      axios.get(constant.EmpdesignationsAPI + '?designation=' + Rater_Designation).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }
        this.setState({ userdata: res.data });
      });
    }
    else {
      this.keywordarray = [];
      // No relation so employee keywords
      localStorage.removeItem('keywordarray');
      axios.get(constant.EmpdesignationsAPI + '?designation=Employee').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
            this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
          }
        }
        this.setState({ userdata: res.data });
      });
    }

  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.rating[name] = nextValue;
    JSON.stringify(this.rating);
  }
  handleClickOpen = (e) => {
    e.preventDefault();
    if (Object.keys(this.rating).length === this.keywordarray.length) {
      this.setState({ showModal: true });
    } else {
      this.setState({ iserrormessage: true });
      this.setState({ showModal: false });
    }
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.setState({ iserrormessage: false });
  };

  handleSubmitRating = event => {
    event.preventDefault();
    var token = localStorage.getItem("jwt");
    var decode = decodeJwt(token);
    var raterid = localStorage.getItem('rater_id');
    var bodydata = {
      "user_id": decode.id,
      "rater_id": raterid,
      "rating": this.rating,
    }

    fetch(constant.OpinionsAPI, {
      method: 'POST',
      headers: {
        'content-length': 492,
        'content-type': 'application/json;' +
          'charset=utf-8'
      },
      body: JSON.stringify(bodydata)
    }).then(response => {
      if (response.status === 200) {
        console.log("success");
      }
      else {
        console.log('failed');
      }
      window.location.replace("/Feedback")
    })
      .catch(error => {
        console.log("failure", error);
      })
  }
  render() {
    var empUsername = localStorage.getItem('RaterfullName') //selected user
    const iserrormessage = this.state.iserrormessage;
    let errormsg;
    if (iserrormessage === true) {
      errormsg = 'Please give rating to all the keywords';
    }
    const { name } = this.state;
    return (
      <div className='chartSection'>
        <div className='userfeedbackbox'>
          <p className='heading' style={{ textTransform: 'capitalize' }}>{empUsername}</p>
          <br></br>
          <form onSubmit={this.handleSubmitRating}>
            {this.keywordarray.map(Keywordata =>
              <div className='ratingalignment'>{Keywordata.replace(/_/g, " ")}
                <StarRatingComponent
                  name={Keywordata}
                  starCount={5}
                  value={name}
                  onStarClick={this.onStarClick.bind(this)}
                  className={'rate'}
                  editing={true}
                />
              </div>)}
            <div>
              <button className="btn-primary btn ratingButton" onClick={this.handleClickOpen}> Submit </button>
              <Dialog open={this.state.showModal} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
                <DialogContent style={{ fontSize: 18 }}> You won't be able to edit this. </DialogContent>
                <DialogContent style={{ fontSize: 18 }}> Do you want to submit ? </DialogContent>
                <DialogContent>  </DialogContent>
                <DialogActions>
                  <div> <Button onClick={this.handleClose} color="primary"> No </Button></div>
                  <div> <Button onClick={this.handleSubmitRating} color="primary" autoFocus> Yes </Button></div>
                </DialogActions>
              </Dialog>
            </div>
            <a className='btn-danger btn ratingButton' href="/Feedback">Cancel</a>
            <p id="errorm">{errormsg}</p>
          </form>
        </div>
      </div>
    );
  }
}