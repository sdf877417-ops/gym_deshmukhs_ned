import React from "react";
import { Navigate } from "react-router-dom";
import { loggedIn } from "../services/auth.js";

export default function Protected({ children }) {
  return loggedIn() ? children : <Navigate to="/admin/login" replace />;
}
