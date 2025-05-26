import React, { useEffect, useRef } from "react";

// This component injects the digital clock HTML and JS from the digital-clock asset, without changing its function or colors.
export const Clock: React.FC = () => {
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only inject once
    if (!clockRef.current) return;
    // Clear previous content
    clockRef.current.innerHTML = `
      <div id="clock" class="light">
        <div class="display">
          <div class="weekdays"></div>
          <div class="ampm"></div>
          <div class="alarm"></div>
          <div class="digits"></div>
        </div>
      </div>
    `;
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "/src/components/Common/digital-clock/assets/js/script.js";
    script.async = true;
    clockRef.current.appendChild(script);
    // Optionally, load jQuery and moment if not present (for legacy clock)
    if (!window["jQuery"]) {
      const jq = document.createElement("script");
      jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min.js";
      jq.async = true;
      document.body.appendChild(jq);
    }
    if (!window["moment"]) {
      const moment = document.createElement("script");
      moment.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js";
      moment.async = true;
      document.body.appendChild(moment);
    }
    // Clean up
    return () => {
      if (clockRef.current) clockRef.current.innerHTML = "";
    };
  }, []);

  // Import the CSS for the clock
  useEffect(() => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/Common/digital-clock/assets/css/style.css";
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div ref={clockRef} />;
};

export default Clock;
