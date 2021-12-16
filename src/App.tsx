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

    electron.ipcRenderer.on('chekking', () => {
      console.log('Verificando download');
      setShowNotification({ show: true, options: false });
      TextNotification.current.innerHTML = 'Buscando por atualizações.';
    })

    electron.ipcRenderer.on('update_available', () => {
      console.log('Update disponivel');
      setShowNotification({ show: true, options: false });
      TextNotification.current.innerHTML = 'Nova atualização disponível. Fazendo Download...';
    });

    electron.ipcRenderer.on('update_downloaded', () => {
      console.log('Download baixado');
      setShowNotification({ show: true, options: true });
      TextNotification.current.innerText = 'Atualização baixada. Será instalada ao reiniciar. Reiniciar agora?';
    });
    
    electron.ipcRenderer.on('update-downloaded', (_: any, props: any) => {
      console.log(_, props);
    });
  }, []);

  return (
    <>
      <GlobaStyle/>
      <ContainerMain>
        <h1>Electron Aplication - auto updater</h1>
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
