import React, {ChangeEvent, Component} from 'react';
import {Button, Modal, Paper, TextField} from "@material-ui/core";
import styles from './styles.module.scss';

class ConnectionModal extends Component {
  state = {
    url: process.env.REACT_APP_API_URL
  }
  onInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      url: event.target.value
    })
  }
  render () {
    const {
      url
    } = this.state;
    return (
      <Modal open={true}>
        <div className={styles.wrapper} >
          <Paper classes={{root: styles.paper}}>
            <TextField
              label="client url"
              value={url}
            />
            <Button variant="contained" color="primary">
              connect
            </Button>
          </Paper>
        </div>
      </Modal>
    )
  }
}

export default ConnectionModal;