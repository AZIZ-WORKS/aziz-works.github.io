// ewc-dashboard/dashboard/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3002';

export const getRegistrations = () => axios.get(`${API_URL}/registrations`);
export const createRegistration = (data) => axios.post(`${API_URL}/registrations`, data);
export const updateRegistration = (id, data) => axios.put(`${API_URL}/registrations/${id}`, data);
export const deleteRegistration = (id) => axios.delete(`${API_URL}/registrations/${id}`);
export const getPhotoById = (id) => axios.get(`${API_URL}/registrations/${id}/photo`, { responseType: 'blob' });

export const getRigs = () => axios.get(`${API_URL}/rigs`);
export const createRig = (data) => axios.post(`${API_URL}/rigs`, data);
export const updateRig = (id, data) => axios.put(`${API_URL}/rigs/${id}`, data);
export const deleteRig = (id) => axios.delete(`${API_URL}/rigs/${id}`);

export const getQueue = () => axios.get(`${API_URL}/queue`);
export const addToQueue = (userId) => axios.post(`${API_URL}/queue`, { userId });
export const removeFromQueue = (userId) => axios.delete(`${API_URL}/queue/${userId}`);

export const assignRegistrationToRig = (userId, rigId) => axios.post(`${API_URL}/assign`, { userId, rigId });
export const releaseRig = (rigId) => axios.post(`${API_URL}/release/${rigId}`);
