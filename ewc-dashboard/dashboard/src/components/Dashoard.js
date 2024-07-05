// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getRigs, createRig, updateRig, deleteRig } from '../services/api';

const Dashboard = () => {
  const [rigs, setRigs] = useState([]);
  const [newRig, setNewRig] = useState({ name: '', status: '', raceType: '' });

  useEffect(() => {
    fetchRigs();
  }, []);

  const fetchRigs = async () => {
    const { data } = await getRigs();
    setRigs(data);
  };

  const handleCreate = async () => {
    await createRig(newRig);
    fetchRigs();
  };

  const handleUpdate = async (id) => {
    await updateRig(id, newRig);
    fetchRigs();
  };

  const handleDelete = async (id) => {
    await deleteRig(id);
    fetchRigs();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <input type="text" placeholder="Name" value={newRig.name} onChange={(e) => setNewRig({ ...newRig, name: e.target.value })} />
        <input type="text" placeholder="Status" value={newRig.status} onChange={(e) => setNewRig({ ...newRig, status: e.target.value })} />
        <input type="text" placeholder="Race Type" value={newRig.raceType} onChange={(e) => setNewRig({ ...newRig, raceType: e.target.value })} />
        <button onClick={handleCreate}>Add Rig</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Race Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rigs.map((rig) => (
            <tr key={rig._id}>
              <td>{rig.name}</td>
              <td>{rig.status}</td>
              <td>{rig.raceType}</td>
              <td>
                <button onClick={() => handleUpdate(rig._id)}>Update</button>
                <button onClick={() => handleDelete(rig._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
