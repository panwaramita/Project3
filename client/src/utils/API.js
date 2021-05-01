import axios from 'axios';

const User={
    createMemories:(data)=>axios.post("http://localhost:5000/data/create",data),
    fetchMemories:()=> axios.get("http://localhost:5000/data/read"),
    updateMemories:(data)=> axios.post("http://localhost:5000/data/update",data),
    filterMemories:(data)=> axios.get("http://localhost:5000/data/filter", { params: { date: data } }),
    deleteMemories:(data)=>axios.delete("http://localhost:5000/data/delete",{ params: { id: data } })
}

export default User;