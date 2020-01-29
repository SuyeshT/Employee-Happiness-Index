import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import CardHeader from '@material-ui/core/CardHeader';
import * as constant from './constant';

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
      iserrormessage: false,
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
    if (com !== "" && Object.keys(this.rating).length === this.keywordarray.length) {
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
    else {
      this.setState({ iserrormessage: true });
    }
  }

  render() {
    const { name } = this.state;
    const iserrormessage = this.state.iserrormessage;
    let button;
    if (iserrormessage == true) {
      button = 'Please give rating to all the keywords and enter comment';
    }
    return (
      <div >
        <div className='chartSection'>
          <center><CardHeader style={{ marginTop: '-50px' }} title={'Below Feedback/Suggestion is for Company.'} /></center>
          <div className='companyfeedbackbox'>
            <form onSubmit={this.handleSubmitRating}>
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
                  placeholder="Note: This rating will be saved as Anonymous."
                  multiline
                  variant="outlined"
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className='companyfdbkbtn'>
                <p id="errorm">{button}</p>
                <br></br>
                <button type='sumbit' className='btn-primary btn ratingButton'>Submit</button>
                <a type='submit' className='btn-danger btn ratingButton' href="/Feedback">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Feedbacktocompany;