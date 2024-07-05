// Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import the base API URL from the environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // Fetch data from the API using the imported API URL
        const response = await axios.get(`${API_URL}/registrations`);
        setRegistrations(response.data);
      } catch (error) {
        setError('Error fetching registrations');
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Registrations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Gender</th> */}
            <th>Phone</th>
            {/* <th>Email</th> */}
            {/* <th>First Time</th> */}
            {/* <th>Photo</th> */}
            <th>Race Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(reg => (
            <tr key={reg._id}>
              <td>{reg.name}</td>
              {/* <td>{reg.gender}</td> */}
              <td>{reg.phone}</td>
              {/* <td>{reg.email}</td> */}
              {/* <td>{reg.firstTime ? 'Yes' : 'No'}</td> */}
              {/* <td>
                {reg.photo ? <img src={reg.photo} alt={reg.name} style={{ width: '50px', height: '50px' }} /> : 'No Photo'}
              </td> */}
              <td>{reg.raceType}</td>
              <td>{new Date(reg.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
