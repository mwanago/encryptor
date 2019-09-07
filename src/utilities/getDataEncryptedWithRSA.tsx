import { ipcRenderer } from 'electron';

export default function getDataEncryptedWithRSA(
  publicKey: string,
  mode: string,
  filename: string,
  key: number[],
  initializationVector: number[],
): Promise<Uint8Array> {
  return new Promise((resolve) => {
    ipcRenderer.send('encryption', {
      publicKey,
      mode,
      key,
      initializationVector,
      filename,
    });
    ipcRenderer.once('encryption-result', (event, result) => {
      resolve(result);
    });
  });
}
