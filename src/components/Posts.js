import axios from 'axios';
import react, { useEffect, useState } from 'react'

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle]= useState("");
    const [body, setBody]=useState("");
    

    useEffect(() =>{
        axios.get(API_URL)
        .then(res => {
            setPosts(res.data)
        })}, [])
        const addPost =() =>{
            if(!title || !body){
                alert("Fields should not be empty!");
                return;
            }
            axios.post(API_URL,
                {
                    title,
                    body,
                    userid:1
                }
            )
            .then(res =>{
                setPosts([...posts ,res.data]);
                setTitle("");
                setBody("");
                alert("Post Added Successfull!!");
            });
        }

  return (
    <div>
        <h3>Post List</h3>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>BODY</th>
                </tr>
            </thead>
            <tbody>
                { posts.map(posts =>(
                        <tr key={posts}>
                            <td>{posts.id}</td>
                            <td>{posts.title}</td>
                            <td>{posts.body}</td>
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td>
                        <input className='form-control'
                        placeholder='Enter Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </td>
                    <td>
                        <input className='form-control'
                        placeholder='Enter Body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}/>
                    </td>
                    <td>
                        <button className='btn btn-primary' onClick={addPost}>Add</button>
                    </td>

                </tr>
            </tfoot>
        </table>
    </div>
  )
}

export default Posts