import React ,{useState,useEffect} from 'react';
import {Grid,TextField} from "@material-ui/core";
import useStyles from "./style";
import Header from "./Header";
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import MemoCard from "./memoCard";
import RefreshIcon from '@material-ui/icons/Refresh';
const MemoList=(props)=>{
  const date=new Date();
  const [holdCard,setholdCard]=useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);
    const [first,setFirst]=React.useState(false);
    const [filter,setfilter]=React.useState(false);
    const [filterData,setFilterData]=React.useState([]);
    const [check,setCheck]=React.useState(false);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleRefresh=()=>{
    setCheck(false);
    document.getElementById("date").value="";
  }
  const handlefilter=async(event, value)=>{
    setCheck(true);
    setPage(1);
    const date=event.target.value;
    console.log(date);
    const res = await fetch(`http://localhost:5000/data/filter?date=`+encodeURIComponent(date)+"&&userId="+props.history.location.state.id,
    {
        method: "GET"
    });
  const  data = await res.json();  
  console.log(data)
                if(data.length)
                {
                  document.getElementById("memory").style.display="none";
                }
                else
                {
                  document.getElementById("memory").style.display="block";
                }
           setFilterData(data);          
           console.log(data);
           console.log(filterData);
           if(filter)
           {

            setfilter(false);
           }
           else
           {
             
           setfilter(true);
           }
  }
  useEffect(()=>{
   async function fetchData(){
    if(!check)
    {
    const res = await fetch(`http://localhost:5000/data/read?id=`+props.history.location.state.id,
    {
        method: "GET"
    });
   const  memo = await res.json();  
    setFirst(true);   
    const noOfCards=memo.reverse();
    if(memo.length)
    {
      document.getElementById("memory").style.display="none";
    }
    else
    {
      document.getElementById("memory").style.display="block";
    }
    if(memo.length)
    {
      let noOfPages=Math.floor(memo.length/3);
      let remaning=0;
      if(memo.length%3)remaning=1;
      let totalNoOfPages=noOfPages+remaning;
      setPageCount(totalNoOfPages);
      console.log(totalNoOfPages);
      if(page===1)
      {  
        let data=[]; 
      for(let i=0;i<3;i++)
      {
        if(noOfCards[i])
       data.push(noOfCards[i])
      
      }
      setholdCard(data);    
    }
    else
    {
      let data=[]
         const noPage=page;
        if(page===pageCount)
        {
        
          for(let i=(noPage-1)*3;i<noOfCards.length;i++)
          {
            data.push(noOfCards[i])
          }
        }
        else
        {
          
      for(let i=(noPage-1)*3;i<=(noPage*3)-1;i++)
      {
        data.push(noOfCards[i])
      }
    }
      setholdCard(data);
    }
    }
  }
    else
    {
      let noOfCards=[];
      noOfCards=filterData;
      noOfCards=noOfCards.reverse();      
      setholdCard('');
      if(filterData.length)
      { 
      let data=[];
        let noOfPages=Math.floor(filterData.length/3);
        let remaning=0;
        if(filterData.length%3)remaning=1;
        let totalNoOfPages=noOfPages+remaning;
        setPageCount(totalNoOfPages);
        console.log(noOfCards);
        if(page===1)
        {  
          noOfCards=noOfCards.reverse();
        for(let i=0;i<3;i++)
        {
          if(noOfCards[i])
         data.push(noOfCards[i])
        //  console.log("data1",data);
        
        }
        setholdCard(data);                     
        // console.log(holdCard);
      }
      else
      { 
           const noPage=page;
           noOfCards=noOfCards.reverse();
          if(page===pageCount)
          {
            for(let i=(noPage-1)*3;i<noOfCards.length;i++)
            {
              // alert(i)
              data.push(noOfCards[(i)])
              // console.log("data2",data);
            }
            
          }
          else
          {
            noOfCards=noOfCards.reverse();
        for(let i=(noPage-1)*3;i<=(noPage*3)-1;i++)
        {
          data.push(noOfCards[i])
        }
      }
        setholdCard(data);
      }
      }
      else
      {
        setPageCount(1)
      }
    }
   }
   fetchData();    
  },[page,first,filter,check]);
    return(
        <div>
         <Header username={props.history.location.state.username} id={props.history.location.state.id} />
         <Grid container   alignitems="stretch" spacing={0} className={classes.root}>
           <Grid item xs={12} style={{backgroundColor:"white"}}>
         <TextField style={{marginTop:"2px"}}
        id="date"
        label="Search"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true, 
        }}
        onChange={handlefilter}
      />
      <button style={{marginTop:"14px"}} class="refresh" title="Refresh" onClick={handleRefresh}><RefreshIcon style={{color:"black"}}/></button>
      </Grid>
         </Grid>            
    <Grid container   alignitems="stretch" spacing={0}>
    {(holdCard.length)?(holdCard.map((data)=>(
                <Grid  item xs={12} sm={12} lg={4} style={{marginBottom:"70px"}}>
                    <MemoCard key={data.id} card={data}></MemoCard>
                    </Grid>) )):<h1  style={{display:"none"}}>No data</h1>
           }
</Grid>
<h1 id="memory" style={{display:"none"}}>No Records</h1>
<footer className={classes.footer}>
         
      <Typography>Page: {page}</Typography>
      <Pagination   id="pagination" count={pageCount} page={page} onChange={handleChange} />
         </footer>
          </div>
    )
}
export default MemoList;