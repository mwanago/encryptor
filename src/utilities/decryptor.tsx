import { ModeOfOperation } from 'aes-js';
import { saveAs } from 'file-saver';
import { key } from './constants';

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
    this.saveToDisc(encodedBytes);
  }

  private saveToDisc(encodedBytes: Uint8Array) {
    const file = new File([new Blob([encodedBytes])], 'test.txt', { type: 'text/plain;charset=utf-8' });
    saveAs(file);
  }
}

export default Decryptor;
