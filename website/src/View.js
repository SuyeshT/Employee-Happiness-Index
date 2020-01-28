import React, { Component } from 'react'
import axios from "axios";
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Pagination, List } from 'react-admin';


const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;
export class View extends Component {

  state = {
    comments: [],
  }
  componentDidMount() {
    axios.get('http://192.168.2.87:1337/opiniontocompanies').then(res => {
      console.log(res.data);
      this.setState({ comments: res.data });
    });
  }
  render() {
    function datesFunction(d) {
      var date = new Date(d)
      var dd = date.getDate() - 1;
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      let HH = date.getHours();
      let mi = date.getMinutes()
      let ss = date.getSeconds();
      if (dd < 10) { dd = '0' + dd };
      if (mm < 10) { mm = '0' + mm };
      return d = dd + '/' + mm + '/' + yyyy + ' ' + HH + ':' + mi + ':' + ss

    }
    return (
      <React.Fragment>
        <div className='commentsSectionbox'>
          <center><CardHeader style={{ color: 'black' }} title={'Comments/ Suggestions from Employees.'} /></center>
          {this.state.comments.map(comm =>
            <div className='commcard'>
              <p className='commentscard'> {comm.commenttocompany}</p>
              <p className='commdate'>{datesFunction(comm.created_at)}</p>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}
export default View;