import axios from 'axios';

const User={
    createMemories:(data)=>axios.post("/data/create",data),
    fetchMemories:()=> axios.get("/data/read"),
    updateMemories:(data)=> axios.post("/data/update",data),
    filterMemories:(data)=> axios.get("/data/filter", { params: { date: data } }),
    deleteMemories:(data)=>axios.delete("/data/delete",{ params: { id: data } })
}

export default User;