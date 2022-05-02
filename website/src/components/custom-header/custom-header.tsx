import { useEffect, useState } from 'react';
import { appStore } from '../../app-store';
import BalendarHeader from '../balendar-header/balendar-header';

export default function CustomHeader() {
  const [isOpen, setIsOpen] = useState(appStore.getState().styles.isHeaderVisable);
  
  useEffect(() => {
    appStore.subscribe(() => setIsOpen(appStore.getState().styles.isHeaderVisable));
  }, [appStore.getState().styles.isHeaderVisable])

  return (
    isOpen ?
      <BalendarHeader /> :
      <></>
  );
}