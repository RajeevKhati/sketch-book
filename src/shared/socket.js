import { io } from "socket.io-client";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://sketch-book-backend-cit8.onrender.com"
    : "http://localhost:5000";

export const socket = io(BACKEND_URL);
