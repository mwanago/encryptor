import { ipcRenderer } from 'electron';
import { initializationVector, key } from './constants';

const channel = 'encryption';

export default function getDataEncryptedWithRSA(publicKey: string, mode: string) {
  ipcRenderer.send(channel, {
    publicKey,
    mode,
    key,
    initializationVector,
  });
  console.log(publicKey);
  ipcRenderer.once(channel, (event, result) => {
    console.log(result);
  });
}
