import React, { ChangeEvent, Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Modes from '../../utilities/modes.enum';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import Logo from '../Logo/Logo';
import ModesSelect from '../ModesSelect/ModesSelect';
import styles from './styles.module.scss';
import generateKeys from "../../utilities/generateKeys";
import ConnectionModal from "../ConnectionModal/ConnectionModal";

interface State {
  mode: Modes;
  publicKey?: string;
  key: number[],
  initializationVector: number[]
}

class App extends Component<{}, State> {
  public state: State = {
    mode: Modes.ctr,
    ...generateKeys()
  };
  public handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    this.setState({
      mode: event.target.value as Modes,
    });
  }
  public async componentDidMount() {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const publicKey = await response.text();
    this.setState({
      publicKey,
    });
  }
  public render () {
    const { mode, publicKey, initializationVector, key } = this.state;
    return (
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.buttons}>
          <Encrypt mode={mode} publicKey={publicKey!} initializationVector={initializationVector} sessionKey={key}/>
          <Decrypt mode={mode} initializationVector={initializationVector} sessionKey={key}/>
        </div>
        <ModesSelect
          onChange={this.handleChange}
          mode={mode}
        />
        <ToastContainer />
        <ConnectionModal />
      </div>
    );
  }
}

export default App;
