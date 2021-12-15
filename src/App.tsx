import React, { useEffect, useState } from 'react';
import { ContainerMain, GlobaStyle } from './Style';
const electron = window.require('electron');

function App() {

  const [ VersionApp, setVersionApp ] = useState('');

  useEffect(() => {
    electron.ipcRenderer.send('get_version_app');
    electron.ipcRenderer.on('get_version_app', (_: any, version: string) => {
      setVersionApp(version);
    })
  }, []);

  return (
    <>
      <GlobaStyle/>
      <ContainerMain>
        <h1>Aplicação Electron - auto updater</h1>
        <strong>VERSÃO: {VersionApp}</strong>
      </ContainerMain>
    </>
  );
}

export default App;
