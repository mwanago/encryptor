import { ModeOfOperation } from 'aes-js';
import { initializationVector, key } from './constants';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';
import saveToDisc from './saveToDisc';

class Decryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async decrypt(mode: Modes) {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.encrypt(bytes);
    saveToDisc(encodedBytes);
  }
}

export default Decryptor;
