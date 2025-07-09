import React, { useEffect, useState } from 'react';
import { getAllUnsyncedAnnotations, markAnnotationSynced } from '../DocumentViwer/Annotation/annotationStorage';
import useNetworkStatus from '../Connection_Status/ConnectionStatus';

export default function SyncManager() {
  const isOnline = useNetworkStatus();
  const [syncStatus, setSyncStatus] = useState('Idle');

  useEffect(() => {
    if (isOnline) {
      syncAnnotations();
    }
 
  }, [isOnline]);

  async function syncAnnotations() {
    setSyncStatus('Syncing...');
    const unsynced = await getAllUnsyncedAnnotations();
    for (const annotation of unsynced) {
      await new Promise((res) => setTimeout(res, 500));
      await markAnnotationSynced(annotation.key);
    }
    setSyncStatus('All annotations synced!');
    setTimeout(() => setSyncStatus('Idle'), 2000);
  }

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, background: isOnline ? '#e0ffe0' : '#ffe0e0', padding: '1rem', borderRadius: 8, boxShadow: '0 2px 8px #0002' }}>
      <strong>Status:</strong> 
      <span
        style={{
          display: 'inline-block',
          width: 12,
          height: 12,
          borderRadius: '50%',
          marginLeft: 8,
          background: isOnline ? '#00d000' : '#d00000',
          boxShadow: `0 0 8px 2px ${isOnline ? '#00d000' : '#d00000'}`,
          animation: 'blinker 1s linear infinite',
          verticalAlign: 'middle',
        }}
      />
     
      <br />
      <strong>Sync:</strong> {syncStatus}
      <style>{`
        @keyframes blinker {
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
