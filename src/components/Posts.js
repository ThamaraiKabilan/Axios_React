import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);     // which post is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const addPost = () => {
    if (!title || !body) {
      alert('Fields should not be empty!');
      return;
    }

    axios
      .post(API_URL, {
        title,
        body,
        userId: 1, // correct property name
      })
      .then((res) => {
        setPosts([...posts, res.data]);
        setTitle('');
        setBody('');
        alert('Post Added Successfully!!');
      });
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };

  const saveEdit = (id) => {
    if (!editTitle || !editBody) {
      alert('Fields should not be empty!');
      return;
    }

    axios
      .put(`${API_URL}/${id}`, {
        title: editTitle,
        body: editBody,
        userId: 1,
      })
      .then((res) => {
        const updated = posts.map((p) =>
          p.id === id ? { ...p, title: res.data.title, body: res.data.body } : p
        );
        setPosts(updated);
        cancelEdit();
        alert('Post Updated Successfully!!');
      });
  };

  const deletePost = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      const filtered = posts.filter((p) => p.id !== id);
      setPosts(filtered);
      alert('Post Deleted Successfully!!');
    });
  };

  return (
    <div>
      <h3>Post List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>BODY</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>

              {/* if row is in edit mode show inputs, otherwise show text */}
              <td>
                {editingId === post.id ? (
                  <input
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  post.title
                )}
              </td>

              <td>
                {editingId === post.id ? (
                  <input
                    className="form-control"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                ) : (
                  post.body
                )}
              </td>

              <td>
                {editingId === post.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(post.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        {/* footer = add new row */}
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                className="form-control"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                placeholder="Enter Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={addPost}>
                Add
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Posts;
