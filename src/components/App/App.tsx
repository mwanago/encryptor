import React, { ChangeEvent, Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Modes from '../../utilities/modes.enum';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import Logo from '../Logo/Logo';
import ModesSelect from '../ModesSelect/ModesSelect';
import styles from './styles.module.scss';

interface State {
  mode: Modes;
  publicKey?: string;
}

class App extends Component<{}, State> {
  public state: State = {
    mode: Modes.ctr,
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
    const { mode, publicKey } = this.state;
    return (
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.buttons}>
          <Encrypt mode={mode} publicKey={publicKey!}/>
          <Decrypt mode={mode}/>
        </div>
        <ModesSelect
          onChange={this.handleChange}
          mode={mode}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
