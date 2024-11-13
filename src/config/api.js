import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Configure axios defaults
axios.defaults.withCredentials = true;