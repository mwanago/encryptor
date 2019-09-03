import React, { ChangeEvent, Component } from 'react';
import Encryptor from '../../utilities/encryptor';
import Modes from '../../utilities/modes.enum';
import FilePicker from '../FilePicker/FilePicker';

interface Props {
  mode: Modes;
}

class Encrypt extends Component<Props> {
  public handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[event.target.files.length - 1];
      const encryptor = new Encryptor(file);
      encryptor.encrypt(this.props.mode);
    }
  }
  public render() {
    return (
      <FilePicker text="encrypt" onUpload={this.handleUpload}/>
    );
  }
}

export default Encrypt;
