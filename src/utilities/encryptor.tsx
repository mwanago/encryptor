import { padding } from 'aes-js';
import * as filenameReservedRegex from 'filename-reserved-regex';
import { toast } from 'react-toastify';
import getDataEncryptedWithRSA from './getDataEncryptedWithRSA';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';
import saveToDisc from './saveToDisc';

class Encryptor {
  public file: File;

  constructor(file: File) {
    this.file = file;
  }

  public async encrypt(mode: Modes, key: number[], initializationVector: number[]) {
    const buffer = await (this.file as any)
      .arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const padded = padding.pkcs7.pad(bytes);
    return getModeOfOperation(mode, key, initializationVector)!.encrypt(padded);
  }

  public async save(mode: Modes, key: number[], initializationVector: number[]) {
    const encodedBytes = await this.encrypt(mode, key, initializationVector);
    saveToDisc(encodedBytes);
    toast.success('File encrypted successfully');
  }

  public async send(
    mode: Modes,
    filename: string,
    publicKey: string,
    key: number[],
    initializationVector: number[],
    url?: string,
  ) {
    const encodedBytes = await this.encrypt(mode, key, initializationVector);

    const file = new File([encodedBytes], 'filename');

    const formData = new FormData();

    const encryptionResult = await getDataEncryptedWithRSA(
      publicKey,
      mode,
      this.getFilename(filename),
      key,
      initializationVector,
    );

    formData.append('file', file);
    formData.append('encryptedData', new File([encryptionResult], 'filename'));

    try {
      const response = await fetch(url!, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success('File transmitted successfully');
      } else {
        toast.error('Some error occurred');
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error occurred');
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
