// ewc-dashboard/src/pages/Rigs.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rigs = () => {
  const [rigs, setRigs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRigs();
  }, []);

  const fetchRigs = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/rigs');
      setRigs(response.data);
    } catch (error) {
      console.error('Error fetching rigs:', error);
      setError('Failed to fetch rigs');
    }
  };

  return (
    <div>
      <h1>Rigs</h1>
      {error && <p>{error}</p>}
      <ul>
        {rigs.map(rig => (
          <li key={rig._id}>
            <p>Type: {rig.type}</p>
            <p>Status: {rig.status}</p>
            <p>Assigned User ID: {rig.userId ? rig.userId : 'Not assigned'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rigs;
