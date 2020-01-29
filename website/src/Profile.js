import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import logo from './download.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios, { post } from 'axios';
import decodeJwt from 'jwt-decode';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import * as constant from './constant';
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center"
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
  function handleClickLoading  ()  {
    
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
        console.log('Your user received an email');
      })
      .catch(error => {
        setOopen(true);
        // Handle error.
        console.log('An error occurred:', error);
      });
  };

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

  // function handleClickOpen() {
  //   var username = user.email;
  //   console.log("user", "clicked", username);
  //   axios.post(constant.API + '/auth/forgot-password', {
  //     email: username,
  //     url: constant.API + '/admin/plugins/users-permissions/auth/reset-password',
  //   })
  //     .then(response => {
  //       if (response.status === 429) {
  //         console.log("Code has been sent to your email");
  //       }
  //       // Handle success.
  //       setOpen(true);
  //       console.log('Your user received an email');
  //     })
  //     .catch(error => {
       
  //       // Handle error.
  //       console.log('An error occurred:', error);
  //     });
  // };

  // function handlenewpassword() {
  //   alert("submit");
  //   axios
  //     .post(constant.API + '/auth/reset-password', {
  //       code: '004a0f1f3f4d7bdbb843431fbc49fdc0362bd0718e4f17147f0ce75f92b0dcd260b59b7c228d39e142303e3946ac29ac58dd0b80ad3cdb09e675f83479fc63c4',
  //       password: 'jayant',
  //       passwordConfirmation: 'jayant'
  //     })
  //     .then(response => {
  //       // Handle success.
  //       console.log('Your user\'s password has been changed.');
  //     })
  //     .catch(error => {
  //       // Handle error.
  //       console.log('An error occurred:', error);
  //     });
  // }

  const handleClose = () => {
    setOpen(false);
    setOopen(false);
    setLooading(prevLoading => !prevLoading);
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
        'Access-Control-Allow-Headers': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded',
        "JWT": JSON.stringify(token),
        'mimeType': 'multipart/form-data',
        "cors": {
          "origin": [ '*' ],
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
  function handlepasswordchange(useremail) {

    console.log("mayank", useremail);

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
      {looading ? <p></p> :<Button style={{ fontSize: 15,fontFamily: 'Crimson Text', textTransform: 'capitalize', backgroundColor: "#0927AF", color: "white" }} variant="standard" color="primary"onClick={handleClickLoading} className={classes.button}>
       Change Password
            </Button> }
            </div>
            <Dialog open={open} onClose={handleClose}
            >
              <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                You have received an Change password link on your registered mail-id.
              </DialogTitle>
              <Button autoFocus onClick={handleClose} color="primary">
                  Okay.!
                </Button>
            </Dialog>
            <Dialog open={oopen} onClose={handleClose}
            >
              <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                Something went wrong please try again after few minutes.
              </DialogTitle>
              <Button autoFocus onClick={handleClose} color="primary">
                  Okay.!
                </Button>
            </Dialog>
      </div>
            {/* <Button style={{ fontSize: 15,fontFamily: 'Crimson Text', textTransform: 'capitalize', backgroundColor: "#0927AF", color: "white" }} variant="standard" color="primary" onClick={handleClickOpen}>
              Change Password 
            </Button> <CircularProgress open={open}/>
            <Dialog open={open} onClose={handleClose}
            >
              <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                You have received an Change password link on your registered mail-id.
              </DialogTitle>
              <Button autoFocus onClick={handleClose} color="primary">
                  Okay.!
                </Button>
            </Dialog> */}
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