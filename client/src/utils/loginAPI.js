import axios from 'axios';

const Users={
    signup:(data)=>axios.post("/api/signup",data),
    login:(data)=> axios.post("/api/login",data),
    logout:()=> axios.post("/api/logout")
}

export default Users;