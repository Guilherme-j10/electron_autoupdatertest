import React, { useEffect, useState, useRef } from 'react';
import { ContainerMain, ContainerNotification, GlobaStyle } from './Style';
const electron = window.require('electron');

function App() {

  const VersionApp = useRef<HTMLParagraphElement>({} as HTMLParagraphElement);
  const TextNotification = useRef<HTMLParagraphElement>({} as HTMLParagraphElement);
  const [ ShowNotification, setShowNotification ] = useState({
    show: false,
    options: false
  });

  useEffect(() => {
    electron.ipcRenderer.send('get_version_app');
    electron.ipcRenderer.on('get_version_app', (_: any, version: string) => {
      VersionApp.current.innerHTML = version;
    });

    electron.ipcRenderer.on('update_downloaded', () => {
      electron.ipcRenderer.removeAllListeners('update_downloaded');
      setShowNotification({ show: true, options: true });
      TextNotification.current.innerText = 'Nova atualização disponivel, sera instalada ao reiniciar o programa. Deseja reiniciar agora ?';
    });
  }, []);

  return (
    <>
      <GlobaStyle/>
      <ContainerMain>
        <h1>Aplicação Electron - auto updater</h1>
        <strong>VERSÃO: <p ref={VersionApp}></p></strong>
      </ContainerMain>
      {ShowNotification.show ? (
        <ContainerNotification>
          <p ref={TextNotification}></p>
          <div className="OptionsButtons">
            {ShowNotification.options ? (
              <>
                <button onClick={() => setShowNotification({ show: false, options: false })}>close</button>
                <button onClick={() => electron.ipcRenderer.send('restart_app')}>restart</button>
              </>
            ) : (
              <button onClick={() => setShowNotification({ show: false, options: false })}>close</button>
            )}
          </div>
        </ContainerNotification>
      ) : false}
    </>
  );
}

export default App;
