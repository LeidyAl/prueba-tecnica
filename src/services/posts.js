import axios from "axios";

const getAllPost =()=>{
    return  axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        return res?.data;
      })
      .catch((error) => {
        throw error;
      });
}

export {getAllPost}