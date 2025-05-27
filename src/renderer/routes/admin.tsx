import React from "react";

const AdminPage = React.lazy(() => import("../components/Admin/AdminPage"));

export default function AdminRoute() {
  return <AdminPage />;
}
