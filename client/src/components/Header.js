import React from 'react';
import {Typography,AppBar,Toolbar} from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home';
import useStyles from "./style";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useHistory} from "react-router-dom";
import API from "../utils/loginAPI";
import "./styles.css"
const Header=(props)=>{
    const classes = useStyles();
    const history=new useHistory();
    const handleCreateMemories=()=>{
      history.push({pathname:"/search",
      state:{username:props.username, id:props.id}
  })
}
  const handleListMemories=()=>{
    history.push({pathname:"/list",
    state:{username:props.username, id:props.id}
})
  }
  
  const handleLogOut=()=>{
    API.logout()
    history.push({pathname:"/"})
    }  
return(
    <div className={classes.root}>
<AppBar position="static" fullWidth>
  <Toolbar>  
  <a onClick={handleLogOut} href="#" class="logoutID" alt="List">Logout</a>
     <div style={{float:"initial"}}>
       <button class="btnList" title="Memories" onClick={handleListMemories}><HomeIcon style={{color:"black"}}/></button>
     <button class="btnList" title="Create Memory" onClick={handleCreateMemories}><AddBoxIcon  style={{color:"black"}}/></button></div> 
    <Typography variant="h6" className={classes.title} style={{marginLeft:"auto"}}>
      {props.username}
    </Typography>
  </Toolbar>
</AppBar>
    </div>
)
}

export default Header;