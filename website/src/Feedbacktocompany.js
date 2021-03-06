import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import CardHeader from '@material-ui/core/CardHeader';
import * as constant from './constant';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from "@material-ui/core/DialogTitle";

export class Feedbacktocompany extends Component {
  rating = {};
  comments = "";
  keywordarray = [];
  error = '';
  constructor() {
    super();
    this.state = {
      userdata: [],
      errorm: "",
      value: '',
      rating: 0,
      empdata: [],
      comments: "",
      postRating: [],
      showModal: false,
      open: false,
    };
  }
  
  componentDidMount() {
    axios.get(constant.API + '/empdesignations?designation=company').then(res => {

      for (var i = 0; i < res.data.length; i++) {
        for (var j = 0; j < res.data[i].empdesignation_id.length; j++) {
          this.keywordarray.push(res.data[i].empdesignation_id[j].keyword_name);
        }
      }
      this.setState({ userdata: res.data });
    });
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
      this.setState({open:true});
      this.setState({ iserrormessage: true });
      this.setState({ showModal: false });
    }
  };
  handleClose = () => {
    this.setState({open:false});
    this.setState({ showModal: false });
    this.setState({ iserrormessage: false });
  };
  onChange = event => {
    this.setState({ value: event.target.value });
  }
  handleSubmitRating = event => {
    event.preventDefault();
    var com = this.state.value;
    var user_id = localStorage.getItem('user_id12')
    var bodydata = {
      "ratingtocompany": this.rating,
      "commenttocompany": com,
      "user_id": user_id
    }
      this.setState({ showModal: true });
      fetch(constant.API + '/opiniontocompanies', {
        method: 'POST',
        headers: {
          'content-length': 492,
          'content-type': 'application/json;' +
            'charset=utf-8'
        },
        body: JSON.stringify(bodydata)
      }).then(response => {
        console.log("response", response);
        if (response.status === 200) {
          console.log("success");
        }
        else {
          console.log('failed');
        }
        window.location.replace("/#")
      })
        .catch(error => {
          console.log("failure", error);
        })
  
  }

  render() {
    const { name } = this.state;
    // const iserrormessage = this.state.iserrormessage;
    // let button;
    // if (iserrormessage == true) {
    //   button = 'Please give rating to all the keywords and enter comment';
    // }
    return (
      <div >
        <div className='chartSection'>
        <center><p className='heading'>Below Feedback/Suggestion is for Company.</p></center>
          <div className='companyfeedbackbox'>
            <form>
              {this.keywordarray.map(Keywordata =>
                <div className='ratingalignment'>
                  {Keywordata.replace(/_/g, " ")}
                  <StarRatingComponent
                    name={Keywordata}
                    starCount={5}
                    value={name}
                    onStarClick={this.onStarClick.bind(this)}
                    className={'rate'}
                    editing={true}
                  /></div>
              )}
              <div className='commtocomp'>
                <TextField
                  id="filled-textarea"
                  className='testfield'
                  label="Comments/Suggestion"
                  multiline
                  variant="outlined"
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                />
                <p>Note: This rating will be saved as Anonymous.</p>
              </div>
              <div className='companyfdbkbtn'>
                {/* <p id="errorm">{button}</p> */}
                <br></br>
                <button type='sumbit' className='btn-primary btn ratingButton' onClick={this.handleClickOpen} >Submit</button>
                <a type='submit' className='btn-danger btn ratingButton' href="/Feedback">Cancel</a>
                <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            <p className="dialog-msg">Please give rating to all the keywords.</p>
          </DialogTitle>
          <Button autoFocus onClick={this.handleClose} color="primary">
              Okay
            </Button>
        </Dialog>
                <Dialog open={this.state.showModal} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
                <DialogContent style={{ fontSize: 18, fontFamily: 'Crimson Text' }}> You won't be able to edit this. </DialogContent>
                <DialogContent style={{ fontSize: 18, fontFamily: 'Crimson Text' }}> Do you want to submit ? </DialogContent>
                <DialogContent>  </DialogContent>
                <DialogActions>
                  <div> <Button onClick={this.handleClose} color="primary"> No </Button></div>
                  <div> <Button onClick={this.handleSubmitRating} color="primary" autoFocus> Yes </Button></div>
                </DialogActions>
              </Dialog>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Feedbacktocompany;