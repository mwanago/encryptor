import { saveAs } from 'file-saver';

export default function saveToDisc(encodedBytes: Uint8Array) {
  const file = new File([new Blob([encodedBytes])], 'test.txt', { type: 'text/plain;charset=utf-8' });
  saveAs(file);
}
