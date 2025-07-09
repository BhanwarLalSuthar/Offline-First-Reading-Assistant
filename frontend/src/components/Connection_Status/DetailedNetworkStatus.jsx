import React, { useState, useEffect } from 'react';

function DetailedNetworkStatus() {
  const [connectionInfo, setConnectionInfo] = useState(null);

  useEffect(() => {
    if ('connection' in navigator) {
      const updateConnectionInfo = () => {
        setConnectionInfo({
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          // Add other properties as needed
        });
      };

      updateConnectionInfo(); // Initial update
      navigator.connection.addEventListener('change', updateConnectionInfo);

      return () => {
        navigator.connection.removeEventListener('change', updateConnectionInfo);
      };
    } else {
      console.warn("Network Information API not supported in this browser.");
    }
  }, []);

  return (
    <div>
      {connectionInfo ? (
        <>
          <p>Effective Type: {connectionInfo.effectiveType}</p>
          <p>Downlink: {connectionInfo.downlink} Mbps</p>
          <p>Round-trip time (RTT): {connectionInfo.rtt} ms</p>
        </>
      ) : (
        <p>Checking network details or API not supported...</p>
      )}
    </div>
  );
}

export default DetailedNetworkStatus;