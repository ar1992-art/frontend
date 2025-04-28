// src/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

// === Auth Token Helpers ===
export function setToken(token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearToken() {
  delete API.defaults.headers.common['Authorization'];
}

// === Authentication Endpoints ===
export function login(credentials) {
  return API.post('auth/login/', credentials);
}

export function refreshToken(data) {
  return API.post('auth/refresh/', data);
}

export function register(data) {
  return API.post('auth/register/', data);
}

export function fetchCurrentUser() {
  return API.get('auth/me/');
}

// === Portfolio Endpoints ===
export function getPortfolio(username) {
  return API.get(`portfolio/${username}/`);
}

// === Case Study Endpoints ===
export function listCaseStudies() {
  return API.get('case-studies/');
}

export function getCaseStudy(id) {
  return API.get(`case-studies/${id}/`);
}

export function createCaseStudy(data) {
  return API.post('case-studies/', data);
}

export function updateCaseStudy(id, data) {
  return API.put(`case-studies/${id}/`, data);
}

export function deleteCaseStudy(id) {
  return API.delete(`case-studies/${id}/`);
}

// === Record Analytics ===
export function recordCaseStudyView(id) {
  return API.post(`case-studies/${id}/record_view/`);
}

export function recordCaseStudyClick(id) {
  return API.post(`case-studies/${id}/record_click/`);
}

// === Analytics Summary ===
export function getAnalyticsSummary() {
  return API.get('analytics/summary/');
}

export default API;
