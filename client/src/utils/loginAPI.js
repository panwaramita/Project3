import axios from 'axios';

const Users={
    signup:(data)=>axios.post("http://localhost:5000/api/signup",data),
    login:(data)=> axios.post("http://localhost:5000/api/login",data),
    logout:(data)=> axios.post("http://localhost:5000/data/update",data)
}

export default Users;