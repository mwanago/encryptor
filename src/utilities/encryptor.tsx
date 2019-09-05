import { padding } from 'aes-js';
import * as filenameReservedRegex from 'filename-reserved-regex';
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

  public async send(mode: Modes, filename: string) {
    const encodedBytes = await this.encrypt(mode);

    const file = new File([encodedBytes], this.getFilename(filename));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);

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

  private getFilename(filename: string) {
    if (!filename) {
      return this.file.name;
    }  {
      const result = filename.replace(filenameReservedRegex(), '');
      const extension = this.file.name.split('.').pop();
      return `${result}.${extension}`;
    }
  }
}

export default Encryptor;
