import { FormControlLabel, Input, Switch } from '@material-ui/core';
import React, { ChangeEvent, Component } from 'react';
import Encryptor from '../../utilities/encryptor';
import Modes from '../../utilities/modes.enum';
import FilePicker from '../FilePicker/FilePicker';
import styles from './styles.module.scss';

interface Props {
  mode: Modes;
}

interface State {
  shouldSend: boolean;
  filename: string;
}

class Encrypt extends Component<Props, State> {
  public state = {
    shouldSend: false,
    filename: '',
  };
  public handleEncrypt = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      shouldSend,
      filename,
    } = this.state;
    if (event.target.files) {
      const file: File = event.target.files[event.target.files.length - 1];
      const encryptor = new Encryptor(file);
      if (shouldSend) {
        encryptor.send(this.props.mode, filename);
      } else {
        encryptor.save(this.props.mode);
      }
      event.target.value = '';
    }
  }
  public handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      shouldSend: event.target.checked,
    });
  }
  public handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filename: event.target.value,
    });
  }
  public render() {
    const {
      shouldSend,
      filename,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <FilePicker
            text="encrypt"
            onUpload={this.handleEncrypt}
            id="encrypt"
          />
          <div className={styles.control}>
            <FormControlLabel
              control={
                <Switch
                  checked={shouldSend}
                  onChange={this.handleSwitchChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="send"
            />
          </div>
        </div>
        <div className={`${styles.inputWrapper} ${shouldSend ? styles.isVisible : ''}`}>
          <Input
            placeholder="filename"
            value={filename}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default Encrypt;
