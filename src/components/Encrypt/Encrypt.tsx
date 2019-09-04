import { FormControlLabel, Switch } from '@material-ui/core';
import React, { ChangeEvent, Component } from 'react';
import Encryptor from '../../utilities/encryptor';
import Modes from '../../utilities/modes.enum';
import FilePicker from '../FilePicker/FilePicker';
import styles from './styles.module.scss';

interface Props {
  mode: Modes;
}

interface Obj {
  [prop: string]: any;
}

interface State {
  shouldSend: boolean;
}

class Encrypt extends Component<Props, State> {
  public state = {
    shouldSend: false,
  };
  public handleEncrypt = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[event.target.files.length - 1];
      const encryptor = new Encryptor(file);
      encryptor.encrypt(this.props.mode);
      event.target.value = '';
    }
  }
  public handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      shouldSend: event.target.checked,
    });
  }
  public render() {
    const {
      shouldSend,
    } = this.state;
    return (
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
    );
  }
}

export default Encrypt;
