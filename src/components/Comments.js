import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

function Comments() {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setComments(res.data);
    });
  }, []);

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditName(comment.name);
    setEditEmail(comment.email);
    setEditBody(comment.body);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
    setEditBody('');
  };

  const saveEdit = (id) => {
    if (!editName || !editEmail || !editBody) {
      alert('Fields should not be empty!');
      return;
    }

    axios
      .put(`${API_URL}/${id}`, {
        name: editName,
        email: editEmail,
        body: editBody,
      })
      .then((res) => {
        const updated = comments.map((c) =>
          c.id === id
            ? {
                ...c,
                name: res.data.name,
                email: res.data.email,
                body: res.data.body,
              }
            : c
        );
        setComments(updated);
        cancelEdit();
        alert('Comment Updated Successfully!!');
      });
  };

  const deleteComment = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      const filtered = comments.filter((c) => c.id !== id);
      setComments(filtered);
      alert('Comment Deleted Successfully!!');
    });
  };

  return (
    <div>
      <h3>Comments</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>e-mail</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>

              <td>
                {editingId === comment.id ? (
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  comment.name
                )}
              </td>

              <td>
                {editingId === comment.id ? (
                  <input
                    className="form-control"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  comment.email
                )}
              </td>

              <td>
                {editingId === comment.id ? (
                  <input
                    className="form-control"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                ) : (
                  comment.body
                )}
              </td>

              <td>
                {editingId === comment.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(comment.id)}
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
                      onClick={() => startEdit(comment)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comments;
