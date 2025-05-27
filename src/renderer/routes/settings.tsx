import React from "react";

const RoomConfig = React.lazy(() => import("../components/Settings/RoomConfig"));

export default function SettingsRoute() {
  return <RoomConfig />;
}
