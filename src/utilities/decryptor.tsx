import { ModeOfOperation } from 'aes-js';
import { saveAs } from 'file-saver';

class Decryptor {
  public file: File;
  public key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  constructor(file: File) {
    this.file = file;
  }

  public async decrypt() {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const encodedBytes = new ModeOfOperation.ctr(this.key).decrypt(bytes);
    this.saveToDisc(encodedBytes);
  }

  private saveToDisc(encodedBytes: Uint8Array) {
    const file = new File([new Blob([encodedBytes])], 'test.txt', { type: 'text/plain;charset=utf-8' });
    saveAs(file);
  }
}

export default Decryptor;
