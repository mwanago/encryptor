import { ModeOfOperation } from 'aes-js';
import { saveAs } from 'file-saver';
import { key } from './constants';
import saveToDisc from './saveToDisc';

class Decryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async decrypt() {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const encodedBytes = new ModeOfOperation.ctr(key).decrypt(bytes);
    saveToDisc(encodedBytes);
  }
}

export default Decryptor;
