import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Display() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
        
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/getDataUser`)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, [users]);

    const handleInputChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>User List</h2>
            <input
                type="text"
                value={filter}
                onChange={handleInputChange}
                placeholder="Enter Name"
            />

            <h2>Filtered Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()))
                        .map((filteredUser) => (
                            <tr key={filteredUser._id}>
                                <td>{filteredUser.name}</td>
                                <td>{filteredUser.email}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
