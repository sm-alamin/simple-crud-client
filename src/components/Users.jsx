import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (_id) => {
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining);
                    toast.success("successfully deleted");
                }
            });
    };

    return (
        <div>
            {users.map(user => (
                <p key={user._id}>
                    {user.name} : {user.email}{' '}
                    <Link to={`/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                </p>
            ))}
            <Toaster />
        </div>
    );
};

export default Users;
