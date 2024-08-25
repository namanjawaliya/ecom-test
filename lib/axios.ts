import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URI,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(process.env.NEXT_PUBLIC_BASE_URI, process.env.NEXT_PUBLIC_API_TIMEOUT)

export default axiosInstance;
