import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import image from "../images/DigitalDiary2.png";
import API from "../utils/loginAPI";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: "black",
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10%',
    // marginTop:"1px"
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
    float: 'center',
    height: '150px',
    // marginTop: '20px',
    marginLeft: '20px',
  },

}));

export default function SignIn() {
const [open, setOpen] = useState(false);
  const [signupUserName,setSignUpUserName]=useState();
const [signupEmail,setSignUpEmail]=useState();
const [signupPassword,setSignUpPassword]=useState();
const [loginEmail,setloginEmail]=useState();
const [loginPassword,setloginPassword]=useState();
const history=new useHistory();
const handleClear=()=>{
  setloginEmail('');
  setloginPassword('');
  document.getElementById("spanLoginTitle").style.display="none";
  document.getElementById("spanLoginPassword").style.display="none";
}
const handleformSubmit=(e)=>{
  e.preventDefault();
  if(document.getElementById("signupUsername").value === "")
  {
    document.getElementById("spanUserName").style.display="block";
  }
  else if(document.getElementById("signupEmail").value === "")
  {
    document.getElementById("spanTitle").style.display="block";
    document.getElementById("spanTitle").textContent="Enter email";
  }
  else if(document.getElementById("signupPasswords").value === "")
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
          document.getElementById("spanTitle").textContent=" ";
          setOpen(true);
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
  
  if(document.getElementById("loginEmail").value === "")
  {
    document.getElementById("spanLoginTitle").style.display="block";
    document.getElementById("spanLoginTitle").textContent="Enter Email";
  }
  else if(document.getElementById("loginPassword").value === "")
  {
    document.getElementById("spanLoginPassword").style.display="block";
  }
  else
  {
    const re = /\S+@\S+\.\S+/;
  if(re.test(loginEmail))
  {
  const login={
    password:loginPassword,
    email:loginEmail
  }
 await API.login(login)
  .then((data)=>{
    document.getElementById("spanLoginTitle").style.display="none";
    document.getElementById("spanLoginPassword").style.display="none";
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
      else
      {
        document.getElementById("spanLoginTitle").style.display="block";
        document.getElementById("spanLoginTitle").textContent="Invalid Email";
      }
    }
  }
  const handleCardClose = () => {
    setOpen(false);
  };
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
            id="loginEmail"
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
            id="loginPassword"
            autoComplete="current-password"
            value={loginPassword}
            onChange={(e)=>{document.getElementById("spanLoginPassword").style.display="none";setloginPassword(e.target.value)}}
          />        
          <div style={{ width: "100%", height: "20px",marginLeft:"12px" }}><span style={{display:"none",fontStyle:'italic',color:"red",float:"left",marginBottom:"3px"}} id="spanLoginPassword">Enter Password</span></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth>Clear</Button>
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
        <Dialog 
        open={open}
        onClose={handleCardClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move',textAlign:'center',fontWeight:"bold" }} id="draggable-dialog-title">
          Successfully SignUp 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
         <div>A digital diary is a place where you can record personal events and experiences online. Rather than keeping a traditional diary or notebook to express your thoughts and feelings, you can create a diary and make it available anywhere and everywhere, as long as you have access to the internet.</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCardClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
        <form className={classes.form} noValidate onSubmit={handleformSubmit}> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="signupUsername"
            label="Username"
            name="username"
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
            id="signupEmail"
            label="Email Address"
            name="email"
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
            id="signupPasswords"
            value={signupPassword}
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
