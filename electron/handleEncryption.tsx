import { publicEncrypt } from 'crypto';
import { ipcMain } from 'electron';

interface IncomingData {
  publicKey: string;
  mode: string;
  key: number[];
  initializationVector: number[];
  filename: string;
}

export default function handleEncryption() {
  ipcMain.on('encryption', (event, data: IncomingData) => {
    const {
      publicKey,
      mode,
      key,
      initializationVector,
      filename,
    } = data;

    const result = publicEncrypt(publicKey, Buffer.from(JSON.stringify({
      mode,
      key,
      initializationVector,
      filename,
    })));

    event.reply('encryption-result', result);
  });
}
