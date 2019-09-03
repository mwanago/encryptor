import { ModeOfOperation } from 'aes-js';
import { key } from './constants';
import saveToDisc from './saveToDisc';

class Encryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async encrypt() {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const encodedBytes = new ModeOfOperation.ctr(key).encrypt(bytes);
    saveToDisc(encodedBytes);
  }
}

export default Encryptor;
