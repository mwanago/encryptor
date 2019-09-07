import React, { ChangeEvent, Component } from 'react';
import { ToastContainer } from 'react-toastify';
import generateKeys from '../../utilities/generateKeys';
import Modes from '../../utilities/modes.enum';
import ConnectionModal from '../ConnectionModal/ConnectionModal';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import Logo from '../Logo/Logo';
import ModesSelect from '../ModesSelect/ModesSelect';
import styles from './styles.module.scss';

interface State {
  mode: Modes;
  publicKey?: string;
  key: number[];
  initializationVector: number[];
  isModalOpened: boolean;
}

class App extends Component<{}, State> {
  public state: State = {
    mode: Modes.ctr,
    isModalOpened: true,
    ...generateKeys(),
  };
  public handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    this.setState({
      mode: event.target.value as Modes,
    });
  }
  public handleConnect = (publicKey: string) => {
    this.setState({
      publicKey,
      isModalOpened: false,
    });
  }
  public render () {
    const { mode, publicKey, initializationVector, key, isModalOpened } = this.state;
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
        <ConnectionModal
          isOpened={isModalOpened}
          onConnect={this.handleConnect}
        />
      </div>
    );
  }
}

export default App;
