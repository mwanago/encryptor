import React, { ChangeEvent, Component } from 'react';
import { toast } from 'react-toastify';
import Decryptor from '../../utilities/decryptor';
import Modes from '../../utilities/modes.enum';
import FilePicker from '../FilePicker/FilePicker';

interface Props {
  mode: Modes;
  sessionKey: number[];
  initializationVector: number[]
}

class Decrypt extends Component<Props> {
  public handleDecrypt = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const {
        mode,
        sessionKey,
        initializationVector
      } = this.props;
      const file: File = event.target.files[event.target.files.length - 1];
      const decryptor = new Decryptor(file);
      decryptor.decrypt(mode, sessionKey, initializationVector);
      toast.success('File decrypted successfully');
      event.target.value = '';
    }
  }
  public render() {
    return (
      <FilePicker
        text="decrypt"
        onUpload={this.handleDecrypt}
        id="decrypt"
      />
    );
  }
}

export default Decrypt;
