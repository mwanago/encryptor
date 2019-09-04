import React, { ChangeEvent, Component } from 'react';
import Decryptor from '../../utilities/decryptor';
import Modes from '../../utilities/modes.enum';
import FilePicker from '../FilePicker/FilePicker';

interface Props {
  mode: Modes;
}

class Decrypt extends Component<Props> {
  public handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log('decrypting!');
      const file: File = event.target.files[event.target.files.length - 1];
      const decryptor = new Decryptor(file);
      decryptor.decrypt(this.props.mode);
    }
  }
  public render() {
    return (
      <FilePicker text="decrypt" onUpload={this.handleUpload}/>
    );
  }
}

export default Decrypt;
