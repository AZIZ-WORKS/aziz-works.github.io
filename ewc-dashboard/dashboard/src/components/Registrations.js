// ewc-dashboard/dashboard/src/components/Registrations.js
import React, { useEffect, useState } from 'react';
import { getRegistrations, createRegistration, updateRegistration, deleteRegistration, getPhotoById, getQueue, addToQueue, removeFromQueue, assignRegistrationToRig, releaseRig } from '../services/api';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [newRegistration, setNewRegistration] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    firstTime: '',
    photo: null,
    raceType: '',
  });
  const [queue, setQueue] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRigId, setSelectedRigId] = useState('');

  useEffect(() => {
    fetchRegistrations();
    fetchQueue();
  }, []);

  const fetchRegistrations = async () => {
    const { data } = await getRegistrations();
    setRegistrations(data);
  };

  const fetchQueue = async () => {
    const { data } = await getQueue();
    setQueue(data);

  };
  const handleCreate = async () => {
    const formData = new FormData();
    Object.keys(newRegistration).forEach(key => {
      formData.append(key, newRegistration[key]);
    });
    await createRegistration(formData);
    fetchRegistrations();
  };

  const handleUpdate = async (id) => {
    await updateRegistration(id, newRegistration);
    fetchRegistrations();
  };

  const handleDelete = async (id) => {
    await deleteRegistration(id);
    fetchRegistrations();
  };

  const handleAddToQueue = async () => {
    await addToQueue(selectedUserId);
    fetchQueue();
  };

  const handleRemoveFromQueue = async (userId) => {
    await removeFromQueue(userId);
    fetchQueue();
  };

  const handleAssign = async () => {
    await assignRegistrationToRig(selectedUserId, selectedRigId);
    fetchRegistrations();
  };

  const handleRelease = async (rigId) => {
    await releaseRig(rigId);
    fetchRegistrations();
  };

  return (
    <div>
      <h1>Registrations</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newRegistration.name}
          onChange={(e) => setNewRegistration({ ...newRegistration, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={newRegistration.gender}
          onChange={(e) => setNewRegistration({ ...newRegistration, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newRegistration.phone}
          onChange={(e) => setNewRegistration({ ...newRegistration, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newRegistration.email}
          onChange={(e) => setNewRegistration({ ...newRegistration, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Time"
          value={newRegistration.firstTime}
          onChange={(e) => setNewRegistration({ ...newRegistration, firstTime: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewRegistration({ ...newRegistration, photo: e.target.files[0] })}
        />
        <input
          type="text"
          placeholder="Race Type"
          value={newRegistration.raceType}
          onChange={(e) => setNewRegistration({ ...newRegistration, raceType: e.target.value })}
        />
        <button onClick={handleCreate}>Create Registration</button>
      </div>
      <div>
        <h2>Queue</h2>
        {queue.map(({ userId }) => (
          <div key={userId}>
            <span>{userId}</span>
            <button onClick={() => handleRemoveFromQueue(userId)}>Remove from Queue</button>
          </div>
        ))}
        <input
          type="text"
          placeholder="User ID"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        />
        <button onClick={handleAddToQueue}>Add to Queue</button>
      </div>
      <div>
        <h2>Assign Rig</h2>
        <input
          type="text"
          placeholder="Rig ID"
          value={selectedRigId}
          onChange={(e) => setSelectedRigId(e.target.value)}
        />
        <button onClick={handleAssign}>Assign</button>
      </div>
      <div>
        <h2>Registrations List</h2>
        {registrations.map(reg => (
          <div key={reg._id}>
            <p>Name: {reg.name}</p>
            <p>Gender: {reg.gender}</p>
            <p>Phone: {reg.phone}</p>
            <p>Email: {reg.email}</p>
            <p>First Time: {reg.firstTime}</p>
            <p>Race Type: {reg.raceType}</p>
            <img src={`http://localhost:3001/registrations/${reg._id}/photo`} alt={reg.name} />
            <button onClick={() => handleDelete(reg._id)}>Delete</button>
            <button onClick={() => handleUpdate(reg._id)}>Update</button>
            <button onClick={() => handleRelease(reg.rigId)}>Release Rig</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registrations;
