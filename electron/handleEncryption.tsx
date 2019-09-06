// import * as crypto from 'crypto';
import { ipcMain } from 'electron';

export default function handleEncryption() {
  ipcMain.on('encryption', (event, arg) => {
    console.log(arg); // prints "ping"

    // crypto.publicEncrypt()

    event.reply('asynchronous-reply', 'pong');
  });
}
