import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import modes from '../../utilities/modes.enum';
import styles from './styles.module.scss';

interface Props {
  onChange: (event: ChangeEvent<{name?: string; value: unknown}>) => void;
  mode?: string;
}

const options = Object.keys(modes);

const ModesSelect: FunctionComponent<Props> = ({ onChange, mode }) => (
  <div className={styles.wrapper}>
    <FormControl fullWidth={true}>
      <InputLabel htmlFor="age-simple">Mode</InputLabel>
      <Select
        value={mode}
        onChange={onChange}
        className={styles.wrapper}
      >
        {
          options.map(option => (
            <MenuItem value={option} key={option}>{option}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  </div>
);

export default ModesSelect;
