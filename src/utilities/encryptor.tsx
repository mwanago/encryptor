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
    return getModeOfOperation(mode, key, initializationVector)!.encrypt(padded);
  }

  public async save(mode: Modes) {
    const encodedBytes = await this.encrypt(mode);
    saveToDisc(encodedBytes);
  }

  public async send(mode: Modes) {
    const encodedBytes = await this.encrypt(mode);
    const file = new File([encodedBytes], 'test.txt');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: formData,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Encryptor;
