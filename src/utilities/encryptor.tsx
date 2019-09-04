import { padding } from 'aes-js';
import { initializationVector, key } from './constants';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';
import saveToDisc from './saveToDisc';

class Encryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async encrypt(mode: Modes) {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const padded = padding.pkcs7.pad(bytes);

    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.encrypt(padded);
    saveToDisc(encodedBytes);
  }
}

export default Encryptor;
