import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles.module.scss';

class FilePicker extends Component {
  public render() {
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="file"
          id="file-input"
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
