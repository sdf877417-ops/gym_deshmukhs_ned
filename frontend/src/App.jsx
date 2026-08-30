import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Protected from "./components/Protected.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Members from "./pages/admin/Members.jsx";
import AddMember from "./pages/admin/AddMember.jsx";
import MemberDetails from "./pages/admin/MemberDetails.jsx";
import Fees from "./pages/admin/Fees.jsx";
import Expiring from "./pages/admin/Expiring.jsx";

const Admin = ({ children }) => (
  <Protected>
    <AdminLayout>{children}</AdminLayout>
  </Protected>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <Admin>
            {/* <Dashboard /> */}
          </Admin>
        }
      />
      <Route
        path="/admin/members"
        element={
          <Admin>
            <Members />
          </Admin>
        }
      />
      <Route
        path="/admin/add-member"
        element={
          <Admin>
            <AddMember />
          </Admin>
        }
      />
      <Route
        path="/admin/members/:id"
        element={
          <Admin>
            <MemberDetails />
          </Admin>
        }
      />
      <Route
        path="/admin/fees"
        element={
          <Admin>
            <Fees />
          </Admin>
        }
      />
      <Route
        path="/admin/expiring"
        element={
          <Admin>
            <Expiring />
          </Admin>
        }
      />
    </Routes>
  );
}
