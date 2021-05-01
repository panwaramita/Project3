import React, { useState, useContext } from 'react';
import API from "../utils/API";
import { Grid, Paper, Typography, TextField, Button} from "@material-ui/core"
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import memoryContext from "../utils/memoryContext";
import Header from "./Header";

const Search = (props) => {
  const { newUserfunction } = useContext(memoryContext);
  const history = useHistory();
  const classes = useStyles();
  const [uploadImage, setUploadImage] = useState();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageurl, setImageurl] = useState('');
  const date=new Date();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (document.getElementById("memoTitle").value === "") {
      document.getElementById("spanTitle").style.display = "block";
      return
    }
    else if (document.getElementById("memoDesc").value === "") {
      document.getElementById("spanDesc").style.display = "block";
      return
    }
    else if (document.getElementById("imageFile").value === "") {
      document.getElementById("spanFile").style.display = "block";
      return
    }
    else {
      document.getElementById("spanTitle").style.display = "none";
      document.getElementById("spanDesc").style.display = "none";
      document.getElementById("spanFile").style.display = "none";
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', "Amita123");
      const res = await fetch("https://api.cloudinary.com/v1_1/duiqykyxv/image/upload",
        {
          method: "POST",
          body: data
        });
      const files = await res.json();

      setImageurl(files.secure_url);
      console.log(files.secure_url);
      const memories = {
        title: title,
        description: description,
        imageurl: files.secure_url,
        UserId:props.history.location.state.id
      }
      await API.createMemories(memories)
        .then((data) => {
          console.log(data);
          newUserfunction();
          history.push({pathname:"/list",
          state:{username:props.history.location.state.username,id:props.history.location.state.id}
      })  
        })
    }
  }
  const handleClear=()=>{
    setTitle('');
    setDescription('');
    setImageurl(' ');
    setUploadImage('');
    
    document.getElementById("memoTitle").value = "";
    document.getElementById("memoDesc").value = "";
    document.getElementById("imageFile").value = ""
    document.getElementById("imagePreview").style.display = "none";
  }
  return (
    <div className={classes.root}>
      <Header username={props.history.location.state.username} id={props.history.location.state.id} />
      <Grid spacing={3}>
        <Grid item xs={12} style={{ height: "500px", marginTop: "30px" }}>
          <Paper className={classes.paper} style={{ width: "50%", margin: "auto" }}>
            <form autoComplete="off" onSubmit={handleSubmit} noValidate className={classes.form}>
              <Typography varient="h6" >Create a Memory</Typography>
              <TextField id="memoTitle" value={title} onChange={(e) => { document.getElementById("spanTitle").style.display = "none"; setTitle(e.target.value) }} className={classes.input} name="Caption" variant="outlined" label="caption" fullWidth />
              <div style={{ width: "100%", height: "20px" }}><span id="spanTitle" className={classes.validateTitle}>* Enter the caption</span></div>
              <TextField rows={7}
                rowsMax={10}
                multiline id="memoDesc" value={description} onChange={(e) => { document.getElementById("spanDesc").style.display = "none"; setDescription(e.target.value) }} className={classes.input} name="message" variant="outlined" label="message" fullWidth />
              <div style={{ width: "100%", height: "20px" }}><span id="spanDesc" className={classes.validateTitle}>* Enter a message about the image</span></div>
              <div className={classes.fileInput}>
                <img id="imagePreview" style={{ display: "none", width: "100px", height: "100px" }} src={uploadImage} alt="" />
                <input id="imageFile" type="file" multiple={false} onChange={(event) => {
                  document.getElementById("spanFile").style.display = "none";
                  setImage(event.target.files[0]); if (event.target.files[0]) {
                    setUploadImage(URL.createObjectURL(event.target.files[0])); console.log("image", event.target.files[0]);

                    document.getElementById("imagePreview").style.display = "block";
                  }
                  else {
                    document.getElementById("imagePreview").style.display = "none";
                  }
                }} />
                <div style={{ width: "100%", height: "30px" }}><span id="spanFile" className={classes.validateTitle}>* Select an image</span></div>
                <Button  className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth>Clear</Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Search;