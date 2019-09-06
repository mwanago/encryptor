import { ipcRenderer } from 'electron';
import { initializationVector, key } from './constants';


export default function getDataEncryptedWithRSA(publicKey: string, mode: string) {
  return new Promise((resolve) => {
    ipcRenderer.send('encryption', {
      publicKey,
      mode,
      key,
      initializationVector,
    });
    console.log(publicKey);
    ipcRenderer.once('encryption-result', (event, result) => {
      resolve(result);
    });
  });
}
