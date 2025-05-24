import axios from "axios";

// Setting up Axios instance with base configuration
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Backend API URL
  headers: { "Content-Type": "application/json" }, // Default headers
  withCredentials: true, // Ensures cookies are sent with requests
});
export default API;
