import { ipcRenderer } from 'electron';
import { initializationVector, key } from './constants';


export default function getDataEncryptedWithRSA(
  publicKey: string,
  mode: string,
  filename: string
): Promise<Uint8Array> {
  return new Promise((resolve) => {
    ipcRenderer.send('encryption', {
      publicKey,
      mode,
      key,
      initializationVector,
      filename
    });
    ipcRenderer.once('encryption-result', (event, result) => {
      resolve(result);
    });
  });
}
