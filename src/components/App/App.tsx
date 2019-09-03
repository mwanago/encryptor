import React, { FunctionComponent } from 'react';
import Decrypt from '../Decrypt/Decrypt';
import Encrypt from '../Encrypt/Encrypt';
import styles from './styles.module.scss';

const App: FunctionComponent = () => {
  return (
    <div className={styles.wrapper}>
      <Encrypt /> <Decrypt/>
    </div>
  );
};

export default App;
