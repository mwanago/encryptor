import { padding } from 'aes-js';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';
import saveToDisc from './saveToDisc';

class Decryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async decrypt(mode: Modes, key: number[], initializationVector: number[]) {
    const buffer = await (this.file as any)
      .arrayBuffer();

    const bytes = new Uint8Array(buffer);
    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.decrypt(bytes);
    const stripped = padding.pkcs7.strip(encodedBytes);

    saveToDisc(stripped);
  }
}

export default Decryptor;
