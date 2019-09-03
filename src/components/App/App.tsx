import React, { ChangeEvent, Component } from 'react';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import ModesSelect from '../ModesSelect/ModesSelect';
import styles from './styles.module.scss';

interface State {
  mode?: string;
}

class App extends Component<{}, State> {
  public state = {
    mode: undefined,
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
        <Encrypt /> <Decrypt/> <ModesSelect onChange={this.handleChange} mode={mode}/>
      </div>
    );
  }
}

export default App;
