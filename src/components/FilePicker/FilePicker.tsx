import { Button } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

const FilePicker: FunctionComponent<Props> = ({
  onUpload, text,
}) => (
  <div className={styles.wrapper}>
    <input
      className={styles.input}
      type="file"
      id="file-input"
      onChange={onUpload}
    />
    <Button variant="contained" color="primary">
      <label className={styles.label} htmlFor="file-input">
        {text}
      </label>
    </Button>
  </div>
);

export default FilePicker;
