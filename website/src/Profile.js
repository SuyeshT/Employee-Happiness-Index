import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import logo from './download.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios, { post } from 'axios';
import decodeJwt from 'jwt-decode';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as constant from './constant';
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  root: {
  },
  button: {
    margin: theme.spacing(2)
  },
  placeholder: {
    height: 10,
    width: 180
  }
}));

var ID = localStorage.getItem('user_id');
var imgFile = localStorage.getItem('profileimage');


const Profile = ({ userId }) => {
  const [open, setOpen] = React.useState(false);
  const [oopen, setOopen] = React.useState(false);
  const dataProvider = useDataProvider();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const timerRef = React.useRef();
  const [error, setError] = useState();
  const classes = useStyles();
  const [looading, setLooading] = React.useState(false);
  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );
  function handleClickLoading() {

    setLooading(prevLoading => !prevLoading);

    var username = user.email;
    console.log("user", "clicked", username);
    axios.post(constant.API + '/auth/forgot-password', {
      email: username,
      url: constant.API + '/admin/plugins/users-permissions/auth/reset-password',
    })
      .then(response => {
        if (response.status === 429) {
          console.log("Code has been sent to your email");
        }
        // Handle success.
        setOpen(true);
        setLooading(false);
        console.log('Your user received an email');
      })
      .catch(error => {
        setOopen(true);
        setLooading(false);
        // Handle error.
        console.log('An error occurred:', error);
      });
  };

  useEffect(() => {
    dataProvider.getOne('users', { id: ID })
      .then(({ data }) => {
        // localStorage.setItem('reportto', data.reporter_name.username);
        console.log('image', data);
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

  var profilesimage = localStorage.getItem('imgurl');
  var profileimg = 'http://192.168.2.87:1337' + profilesimage;
  var defalutimg = { logo };

  function datesFunction(d) {
    var date = new Date(d)
    var dd = date.getDate() - 1;
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd };
    if (mm < 10) { mm = '0' + mm };
    return d = dd + '/' + mm + '/' + yyyy
  }

  const handleClose = () => {
    setOpen(false);
    setOopen(false);
  };



  function handleSubmitRating(event) {
    event.preventDefault();
    var token = localStorage.getItem("jwt");
    var decode = decodeJwt(token);
    var image = localStorage.getItem('profileimage');
    console.log('imgFile:: ', token);
    let fileData = {
      'lastModified': imgFile.lastModified,
      'lastModifiedDate': imgFile.lastModifiedDate,
      'name': imgFile.name,
      'size': imgFile.size,
      'type': imgFile.type,
      'webkitRelativePath': imgFile.webkitRelativePath
    }
    // console.log('read filesdata : ', fileData);
    var bodydata = {
      "files": fileData,
      "path": "/public/upload",
      "refId": decode.id,
      "ref": "user",
      "source": "users-permissions",
      "field": "avatar",

    }
    console.log('POST Data', bodydata);
    fetch(constant.API + '/upload', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        "JWT": JSON.stringify(token),
        'mimeType': 'multipart/form-data',
        "cors": {
          "origin": ['*'],
          "headers": ['Authorization', 'Content-Type', 'If-None-Match']
        }
      },
      body: JSON.stringify(bodydata)
    }).then(response => {
      if (response.status === 200) {
        console.log("success", response);
      }
      else {
        console.log('failed', response);
      }
    })
      .catch(error => {
        console.log("failure", error);
      })
  }

  function onChange(imageFile) {
    let files = imageFile.target.files[0];
    imgFile = imageFile.target.files[0];
    localStorage.setItem('profileimage', imgFile);
  }
  return (
    <Grid fluid>
      <div className={'chartSection'}>
        <Grid className={"profileContainer"} >
          <div className={"profile"}>
            <img alt="Profile Image" src={'http://192.168.2.87:1337' + user.avatar.url} className={'profilepicture'} />
            <p id='fullname' style={{ textTransform: 'capitalize' }}> {user.fullName}</p>
          </div>
          <form className='profilebtn' onSubmit={handleSubmitRating}>
            <input type='file' name='file' onChange={(e) => onChange(e)}></input>
            <input type="submit" className={'btn btn-primary profilebutton'} value="Submit" />
          </form>
          <div id="forgotpassword">
            <div className={classes.root}>
              <div className={classes.placeholder}>
                <Fade
                  in={looading}
                  style={{
                    transitionDelay: looading ? "800ms" : "0ms"
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </div>
              <div id="loading">
                {looading ? <p></p> : <a id="changepassword" style={{ fontSize: 15, fontFamily: 'Crimson Text', textTransform: 'capitalize', backgroundColor: "", color: "black" }} variant="standard" color="primary" onClick={handleClickLoading} className={classes.button}>
                  Change password
        </a>}
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                  <p className="dialog-msg"> We just send you an email message. Inside that message is a link you can use to change your password.</p>
                </DialogTitle>
                <Button autoFocus onClick={handleClose} color="primary">
                  Okay
            </Button>
              </Dialog>
              <Dialog open={oopen} onClose={handleClose} >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                  <p className="dialog-msg"> Something went wrong please try again after some time.</p>
                </DialogTitle>
                <Button autoFocus onClick={handleClose} color="primary">
                  Okay
          </Button>
              </Dialog>
            </div>
          </div>
          <div className={'ProfileDetails'} >
            <p className={'details'}><b>Username:</b><p className={'detailsarea'}>{user.username}</p></p>
            <p className={'details'}><b>Email:</b><p className={'detailsarea'}>{user.email}</p></p>
            <div style={{ textTransform: 'capitalize' }}>
              <p className={'details'}><b>Designation:</b><p className={'detailsarea'}>{user.empdesignation.designation}</p></p>
              <p className={'details'}><b>Report:</b><p className={'detailsarea'}>{user.reporter_name.username}</p></p>
              <p className={'details'}><b>D.O.B:</b><p className={'detailsarea'}>{datesFunction(user.dateOfBirth)}</p></p>
              <p className={'details'}><b>Joining Date:</b><p className={'detailsarea'}>{datesFunction(user.joiningDate)}</p></p>
            </div>
          </div>
        </Grid>
      </div >
    </Grid>
  )
};
export default Profile;