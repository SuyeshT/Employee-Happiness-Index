import React from 'react';
import axios from 'axios';
// import * as constant from '../constant';
export default class Comments extends React.Component  {
  state = {
    keywords:[],
  };
  componentDidMount() {
    axios.get("http://192.168.2.87:1337/opinions?rater_id="+ localStorage.getItem('user_id12')).then(res => {
      console.log(res.data);
      this.setState({ keywords: res.data });
    });
  }
  render()  {
    return (
    <ul>{this.state.keywords.map(keyword => 
      <li key={keyword.id}>{keyword.comment}</li>
      )}
      </ul>
    )
  }
}