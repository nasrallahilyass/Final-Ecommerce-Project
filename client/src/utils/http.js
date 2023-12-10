import axios from "axios";
export function getToken() {
  const state = JSON.parse(localStorage.getItem("persist:auth"));
  return state?.jwt?.replace(/"/g, "");
}
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  },
});

export default http;
