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
    <div style={{ position: 'fixed', bottom: 20, right: 20, background: isOnline ? '#e0ffe0' : '#ffe0e0', padding: '1rem', borderRadius: 8, boxShadow: '0 2px 8px #0002' }}>
      <strong>Status:</strong> {isOnline ? 'Online' : 'Offline'}<br />
      <strong>Sync:</strong> {syncStatus}
    </div>
  );
}
