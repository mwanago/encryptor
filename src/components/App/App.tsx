import React, { FunctionComponent } from 'react';
import Encrypt from '../Encrypt/Encrypt';
import styles from './styles.module.scss';

const App: FunctionComponent = () => {
  return (
    <div className={styles.wrapper}>
      <Encrypt />
    </div>
  );
};

export default App;
