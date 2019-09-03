import React, { ChangeEvent, Component } from 'react';
import Modes from '../../utilities/modes.enum';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import Logo from '../Logo/Logo';
import ModesSelect from '../ModesSelect/ModesSelect';
import styles from './styles.module.scss';

interface State {
  mode?: string;
}

class App extends Component<{}, State> {
  public state = {
    mode: Modes.ctr,
  };
  public handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    this.setState({
      mode: event.target.value as string,
    });
  }
  public render () {
    const { mode } = this.state;
    return (
      <div className={styles.wrapper}>
        <Logo />
        <Encrypt mode={mode}/>
        <Decrypt/>
        <ModesSelect
          onChange={this.handleChange}
          mode={mode}
        />
      </div>
    );
  }
}

export default App;
