import { Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import React, { ChangeEvent, Component } from 'react';
import styles from './styles.module.scss';

class FilePicker extends Component {
  public onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[event.target.files.length - 1];
      console.log(file);
      ipcRenderer.send('asynchronous-message', 'ping');
    }
  }
  public render() {
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="file"
          id="file-input"
          onChange={this.onUpload}
        />
        <Button variant="contained" color="primary">
          <label className={styles.label} htmlFor="file-input">
            Upload
          </label>
        </Button>
      </div>
    );
  }
}

export default FilePicker;
