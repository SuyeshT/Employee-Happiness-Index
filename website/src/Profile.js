import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import logo from './download.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios, { post } from 'axios';
import decodeJwt from 'jwt-decode';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },

}));
var ID = localStorage.getItem('user_id');
var imgFile= localStorage.getItem('profileimage');
const Profile = ({ userId }) => {

  const dataProvider = useDataProvider();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    dataProvider.getOne('users', { id: ID })
      .then(({ data }) => {
        localStorage.setItem('reportto', data.reporter_name.username);

        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!user) return null;
  function datesFunction(d) {
    var date = new Date(d)
    var dd = date.getDate() - 1;
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd };
    if (mm < 10) { mm = '0' + mm };
    return d = dd + '/' + mm + '/' + yyyy
  }

  function handleSubmitRating(event) {
    event.preventDefault();
    var token = localStorage.getItem("jwt");
    var decode = decodeJwt(token);
    var image = localStorage.getItem('profileimage');
    // image.then(data=>{
    //   console.log('imgdataaa-- ', data);
    // })
    // console.log('Image data',JSON.parse(image));
    console.log('imgFile:: ',imgFile)
    var bodydata = {
      "files": imgFile,
      "path": "/public/upload",
      "refId": decode.id,
      "ref": "user",
      "source": "users-permissions",
      "field": "avatar",
    }

   
    console.log('POST Data', bodydata);
    fetch('http://localhost:1337/upload/', {
      method: 'POST',
      headers: {
        'content-length': 492,
        'content-type': 'application/json;' +
          'charset=utf-8'
      },
      body: JSON.stringify(bodydata)
    }).then(response => {
      if (response.status === 200) {
        console.log("success",response);
      }
      else {
        console.log('failed',response);
      }
    })
      .catch(error => {
        console.log("failure", error);
      })

  }

  function onChange(imageFile) {
    // console.log('image',imageFile.target.files[0]);
    //   e.preventDefault();
    //   var token = localStorage.getItem("jwt");
    //   var decode = decodeJwt(token);
    let files = imageFile.target.files[0];
    imgFile = imageFile.target.files[0];
    console.log('files*-- ', imageFile.target.files);
    localStorage.setItem('profileimage',files);
    
    // this.fileData = files;
    // console.log('globl files*-- ', this.fileData);
    // console.log('parsed-- ',JSON.stringify(files));
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0])
    // reader.onload = (e) => {
    //   console.log('data to be posted', e.target.result);
    //   const url = 'http://192.168.2.85:1337/users';
    //   const formdata = { file: e.target.result }
    //   return post(url.formdata)
    //     .then(response => console.log('result', response))
    // }

    // console.log('Data files', files);


    //   const request = new XMLHttpRequest();

    //   request.open('POST','/upload');

    //   request.send(new FormData(formElement));
    //   console.log('Data files', formElement);
    // });

    // var userid = localStorage.getItem("user_id");
    // console.log('userid', userid);
    // var bodydata = {

    //   "files": "e.target.files", // Buffer or stream of file(s)
    //   "path": "/public/upload", // Uploading folder of file(s).
    //   "refId": "userid", // User's Id.
    //   "ref": "users", // Model name.
    //   "source": "users-permissions", // Plugin name.
    //   "field": "avatar" // Field name in the User model.
    // }
    // fetch('http://192.168.2.85:1337/users', {
    //   method: 'POST',
    //   headers: {
    //     'content-length': 492,
    //     'content-type': 'application/json;' +
    //       'charset=utf-8'
    //   },
    //   body: JSON.stringify(bodydata)
    // }).then(response => {
    //   if (response.status === 200) {
    //     console.log("success");
    //   }
    //   else {
    //     console.log('failed');
    //   }
    // })
    //   .catch(error => {
    //     console.log("failure", error);
    //   })
  }
  return (
    <Grid fluid>
      <div className={'chartSection'}>
        <Grid className={"profileContainer"} >
          <div className={"profile"}>
            <img alt="Remy Sharp" src={logo} className={'profilepicture'} />
            <p id='fullname' style={{ textTransform: 'capitalize' }}> {user.fullName}</p>
          </div>
          <form className='profilebtn' onSubmit={handleSubmitRating}>
            <input type='file' name='file' onChange={(e) => onChange(e)}></input>
            <input type="submit" className={'btn btn-primary'} value="Submit" />
          </form>
          <div className={'ProfileDetails'} >
            <p>
              <p className={'details'}><b>Username:</b><p className={'detailsarea'}>{user.username}</p></p>
              <p className={'details'}><b>Email:</b><p className={'detailsarea'}>{user.email}</p></p>
              <div style={{ textTransform: 'capitalize' }}>
                <p className={'details'}><b>Designation:</b><p className={'detailsarea'}>{user.empdesignation.designation}</p></p>
                <p className={'details'}><b>Report:</b><p className={'detailsarea'}>{user.reporter_name.username}</p></p>
                <p className={'details'}><b>Code:</b><p className={'detailsarea'}>T190902</p></p>
                <p className={'details'}><b>Contact Number:</b><p className={'detailsarea'}>+91 9875894200</p></p>
                <p className={'details'}><b>D.O.B:</b><p className={'detailsarea'}>{datesFunction(user.dateOfBirth)}</p></p>
                <p className={'details'}><b>Joining Date:</b><p className={'detailsarea'}>{datesFunction(user.joiningDate)}</p></p>
              </div>
            </p>
          </div>

        </Grid>
      </div >
    </Grid>
  )
};
export default Profile;