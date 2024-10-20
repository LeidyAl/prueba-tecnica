import axios from "axios";

const getAllPost =()=>{
    return  axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        return res?.data;
      })
      .catch((error) => {
        throw error;
      });
}

const deletePost =({id})=>{
	return  axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
			return res;
		})
		.catch((error) => {
			throw error;
		});
}

export {getAllPost,deletePost}