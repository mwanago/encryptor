import { Button } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface Props {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  id: string;
}

const FilePicker: FunctionComponent<Props> = ({
  onUpload, text, id,
}) => (
  <div className={styles.wrapper}>
    <input
      className={styles.input}
      type="file"
      id={id}
      onChange={onUpload}
    />
    <Button variant="contained" color="primary">
      <label className={styles.label} htmlFor={id}>
        {text}
      </label>
    </Button>
  </div>
);

export default FilePicker;
