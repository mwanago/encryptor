import React, {ChangeEvent, Component} from 'react';
import {Button, Modal, Paper, TextField} from "@material-ui/core";
import styles from './styles.module.scss';

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
  handleConnection = async (event: ClickEvent) => {
    event.preventDefault();
    const { url } = this.state;
    const { onConnect } = this.props;
    this.setState({
      isConnecting: true
    });
    const response = await fetch(url);
    const publicKey = await response.text();
    onConnect(publicKey);
    this.setState({
      isConnecting: false
    });
  }
  render () {
    const {
      url
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
              >
                connect
              </Button>
            </Paper>
          </form>
        </div>
      </Modal>
    )
  }
}

export default ConnectionModal;