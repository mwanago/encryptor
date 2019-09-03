import React, { ChangeEvent, Component } from 'react';
import Encryptor from '../../utilities/encryptor';
import FilePicker from '../FilePicker/FilePicker';

class Encrypt extends Component {
  public handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[event.target.files.length - 1];
      const encryptor = new Encryptor(file);
      encryptor.encrypt();
    }
  }
  public render() {
    return (
      <FilePicker text="encrypt" onUpload={this.handleUpload}/>
    );
  }
}

export default Encrypt;
