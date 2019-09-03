import React, { ChangeEvent, Component } from 'react';
import Decryptor from '../../utilities/decryptor';
import FilePicker from '../FilePicker/FilePicker';

class Decrypt extends Component {
  public handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[event.target.files.length - 1];
      const decryptor = new Decryptor(file);
      decryptor.decrypt();
    }
  }
  public render() {
    return (
      <FilePicker text="decrypt" onUpload={this.handleUpload}/>
    );
  }
}

export default Decrypt;
