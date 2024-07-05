// ewc-dashboard/src/pages/Queue.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/queue');
      setQueue(response.data);
    } catch (error) {
      console.error('Error fetching queue:', error);
      setError('Failed to fetch queue');
    }
  };

  const addToQueue = async (userId) => {
    try {
      await axios.post('http://localhost:3002/api/queue', { userId });
      fetchQueue();
    } catch (error) {
      console.error('Error adding to queue:', error);
      setError('Failed to add to queue');
    }
  };

  const removeFromQueue = async (userId) => {
    try {
      await axios.delete(`http://localhost:3002/api/queue/${userId}`);
      fetchQueue();
    } catch (error) {
      console.error('Error removing from queue:', error);
      setError('Failed to remove from queue');
    }
  };

  return (
    <div>
      <h1>Queue</h1>
      {error && <p>{error}</p>}
      <ul>
        {queue.map(item => (
          <li key={item.userId}>
            <p>User ID: {item.userId}</p>
            <button onClick={() => removeFromQueue(item.userId)}>Remove from Queue</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToQueue('someUserId')}>Add to Queue</button>
    </div>
  );
};

export default Queue;
