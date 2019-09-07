import React, {ChangeEvent, Component, FormEvent} from 'react';
import {Button, CircularProgress, Modal, Paper, TextField} from "@material-ui/core";
import styles from './styles.module.scss';
import { toast } from 'react-toastify';

interface Props {
  onConnect: (publicKey: string) => void;
  isOpened: boolean;
}

interface State {
  url: string;
  isConnecting: boolean;
}

class ConnectionModal extends Component<Props, State> {
  state: State = {
    url: process.env.REACT_APP_API_URL || '',
    isConnecting: false
  }
  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      url: event.target.value
    })
  }
  handleConnection = async (event: FormEvent) => {
    event.preventDefault();
    const { url } = this.state;
    const { onConnect } = this.props;
    this.setState({
      isConnecting: true
    });
    const response = await fetch(url);
    const publicKey = await response.text();
    onConnect(publicKey);
    toast.success('Connection established');
    this.setState({
      isConnecting: false
    });
  }
  render () {
    const {
      url,
      isConnecting
    } = this.state;
    const {
      isOpened
    } = this.props;
    return (
      <Modal open={isOpened}>
        <div className={styles.wrapper} >
          <form onSubmit={this.handleConnection}>
            <Paper classes={{root: styles.paper}}>
              <TextField
                label="client url"
                value={url}
                onChange={this.onInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isConnecting}
              >
                connect
                {isConnecting && <CircularProgress size={24} className={styles.buttonProgress} />}
              </Button>
            </Paper>
          </form>
        </div>
      </Modal>
    )
  }
}

export default ConnectionModal;