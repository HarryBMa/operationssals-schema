import React from "react";

const SettingsPage = React.lazy(() => import("../components/Settings/SettingsPage"));

export default function SettingsRoute() {
  return <SettingsPage />;
}
