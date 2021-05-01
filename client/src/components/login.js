import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import image from "../images/DigitalDiary2.png";
import API from "../utils/loginAPI";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: "black",
    backgroundColor: 'white',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10%',
    marginTop:"1px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    padding: '5%',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    float: 'left',
    height: '150px',
    marginTop: '20px',
    marginLeft: '20px',
  },

}));

export default function SignIn() {
  const [signupUserName,setSignUpUserName]=useState();
const [signupEmail,setSignUpEmail]=useState();
const [signupPassword,setSignUpPassword]=useState();
const [loginEmail,setloginEmail]=useState();
const [loginPassword,setloginPassword]=useState();
const history=new useHistory();
const handleformSubmit=(e)=>{
  e.preventDefault();
  if(signupUserName=="")
  {
    document.getElementById("spanUserName").style.display="block";
  }
  else if(signupEmail=="")
  {
    document.getElementById("spanTitle").style.display="block";
  }
  else if(signupPassword=="")
  {
    document.getElementById("spanPassword").style.display="block";
  }
  else
  {
    
    document.getElementById("spanTitle").style.display="none";
    document.getElementById("spanUserName").style.display="none";
    document.getElementById("spanPassword").style.display="none";

  const re = /\S+@\S+\.\S+/;
  if(re.test(signupEmail))
  {
    const signUp={  
      username:signupUserName,
      password:signupPassword,
      email:signupEmail
    }
    API.signup(signUp)
        .then((data)=>{
          // document.getElementById("spanTitle").style.display="none";
          setSignUpEmail('');
          setSignUpUserName('');
          setSignUpPassword('');
          setInterval(document.getElementById("spanSignUpSuccess").style.display="block",1000);
          document.getElementById("spanTitle").textContent=" ";
        })
        .catch((err)=>{
                document.getElementById("spanTitle").style.display="block";
                document.getElementById("spanTitle").textContent="Email already exist";
        })
  }
  else
  {
    document.getElementById("spanTitle").textContent="Email not valid";
    document.getElementById("spanTitle").style.display="block";
  }
  }
}
const handleformLoginSubmit=async(e)=>{
  e.preventDefault();
  const login={
    password:loginPassword,
    email:loginEmail
  }
 await API.login(login)
  .then((data)=>{
    document.getElementById("spanLoginTitle").style.display="none";
    console.log("the result is",data)
    history.push({pathname:"/list",
    state:{username:data.data.username, id:data.data.id}
})    
       })
       .catch((err)=>{
        document.getElementById("spanLoginTitle").style.display="block";
        document.getElementById("spanLoginTitle").textContent="Email not exist";
       })
  }

  const classes = useStyles();
const imageOne = image;
console.log(imageOne)
  return (
    <div >
          <img className={classes.logo}
        src={imageOne}
        title="Logo"
      />
         <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleformLoginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginEmail}
            onChange={(e)=>{ document.getElementById("spanLoginTitle").style.display="none";setloginEmail(e.target.value)}}
            
          />
          <div style={{ width: "100%", height: "20px",marginLeft:"12px" }}><span style={{display:"none",fontStyle:'italic',color:"red",float:"left",marginBottom:"3px"}} id="spanLoginTitle">Email not exist</span></div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginPassword}
            onChange={(e)=>{setloginPassword(e.target.value)}}
          />         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </div>
      </Grid>
      <Grid item xs={12} sm={6}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <div style={{ width: "100%",marginLeft:"12px" ,backgroundColor:"blue"}}><span style={{fontSize:"40px",display:"none",color:"red",height:"5px"}} id="spanSignUpSuccess">Successfully Signup</span></div>
        <form className={classes.form} noValidate onSubmit={handleformSubmit}> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={signupUserName}
            onChange={(e)=>{document.getElementById("spanUserName").style.display="none"
            ;setSignUpUserName(e.target.value)}}
          />
          <div style={{ width: "100%",marginLeft:"12px" }}><span style={{display:"none",fontStyle:'italic',color:"red",float:"left",marginBottom:"3px"}} id="spanUserName">Enter username</span></div>
               <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={signupEmail}
            onChange={(e)=>{
              document.getElementById("spanTitle").style.display="none";
              setSignUpEmail(e.target.value)}}
          />
          <div style={{ width: "100%",marginLeft:"12px" }}><span style={{display:"none",fontStyle:'italic',color:"red",float:"left",marginBottom:"3px"}} id="spanTitle">Email already exist</span></div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"  value={signupPassword}
            onChange={(e)=>{
              document.getElementById("spanPassword").style.display="none";
              setSignUpPassword(e.target.value)}}
          />
         <div style={{ width: "100%",marginLeft:"12px" }}><span style={{display:"none",fontStyle:'italic',color:"red",float:"left",marginBottom:"3px"}} id="spanPassword">Enter password</span></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      </Grid>
      </Grid>
   
      </div>     
  );
}
