// ewc-dashboard/src/components/AssignRigs.js

import React from 'react';
import axios from 'axios';

const AssignRigs = () => {
  const assignRigs = async () => {
    try {
      await axios.post('http://localhost:3002/api/registrations/assignRigs');
      alert('Rigs assigned successfully');
    } catch (error) {
      console.error('Error assigning rigs:', error);
      alert('Failed to assign rigs');
    }
  };

  return (
    <div>
      <button onClick={assignRigs}>Assign Rigs</button>
    </div>
  );
};

export default AssignRigs;
