import React from "react";

const DashboardPage = React.lazy(() => import("../components/Dashboard/DashboardPage"));

export default function DashboardRoute() {
  return <DashboardPage />;
}
