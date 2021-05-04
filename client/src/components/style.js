import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  input:{
margin:"5px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0%',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  media: {
    height: "200px",
    width:"300px",
    // paddingTop: '56.25%', // 16:9
    objectFit:"contain"
  },
  media1: {
    height: "400px",
    width:"400px",
    // paddingTop: '56.25%', // 16:9
    objectFit:"contain"
  },
  footer:{
    marginTop: "0rem",
  padding: "0rem",
  backgroundColor: "#ebf0fa",
  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",
  height:"55px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "red",
  },
  ImagePreview:{
    width:"100px",
    height:"100px"
  },
  validateTitle:{
    display: "none",
    color: "red",
    position: "absolute",
    fontStyle:"Italic"
  },
  scrollBox: {
    overflowY: "scroll",
    overflowX:'hidden',
    height: "125px",
    padding: "1rem",
    textAlign:"left"
},
validateTitleSearch:{
  display:"block",
  color: "red",
  float:"right",
  fontStyle:"Italic"
}


}));