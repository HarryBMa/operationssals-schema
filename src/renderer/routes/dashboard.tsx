import React from "react";

const SchemaDisplay = React.lazy(() => import("../components/Dashboard/SchemaDisplay"));

export default function DashboardRoute() {
  return <SchemaDisplay />;
}
