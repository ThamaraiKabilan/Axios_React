import axios from 'axios';
import React, { useEffect, useState } from 'react'

const API_URL ="https://jsonplaceholder.typicode.com/comments";

function Comments() {
    const [comments , setComments] = useState([]);
    
     
    useEffect(() => {
        axios.get(API_URL)
        .then(res =>{
            setComments(res.data)
        })
    },[])
  return (
    <div>
        <h3>Comments</h3>    
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>e-mail</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                { comments.map(comments => (
                    <tr key={comments}>
                        <td>{comments.id}</td>
                        <td>{comments.name}</td>
                        <td>{comments.email}</td>
                        <td>{comments.body}</td>
                    </tr>
                ))

                }
            </tbody>
        </table>
        
        </div>
  )
}

export default Comments