import React, { Component } from 'react'
import axios from "axios";
import Pagination from "./components/Pagination";

export class View extends Component {

  state = {
    comments: [],
    userdata: [],
    allNames: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null,
  }
  componentDidMount() {
    axios.get('http://192.168.2.87:1337/opiniontocompanies').then(res => {
      console.log("daaaaaaaaata",res.data);
      var obj=res.data;
      for (var rm = 0; rm < obj.length; rm++) {
        if (obj[rm].commenttocompany === "" || obj[rm].commenttocompany === null || obj[rm].commenttocompany === undefined) {
          obj.splice(rm, 1);
        }
      }
      console.log("data",obj);
      this.setState({ comments: res.data });
      const allNames = this.state.comments;
      this.setState({ allNames });
      
    });
  }
  onPageChanged = data => {
    const { allNames } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allNames.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentCountries, totalPages });
  };
  render() {
    const {
      allNames,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    const totalCountries = allNames.length;

    if (totalCountries === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    function datesFunction(d) {
      var date = new Date(d)
      var dd = date.getDate();
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
        <div className='chartSection'>
        <center><p className='heading'> Comments/ Suggestions from Employees.</p></center>
          <div className="row d-flex flex-row py-5">
            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center">
                {currentCountries.map(comm =>
                  <div className='commcard'>
                    <p className='commentscard'> {comm.commenttocompany}</p>
                    <p className='commdate'>{datesFunction(comm.created_at)}</p>
                  </div>
                )}
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
                  pageLimit={5}
                  pageNeighbours={0}
                  onPageChanged={this.onPageChanged}
                />
              </div>
            </div>
            <br></br>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default View;