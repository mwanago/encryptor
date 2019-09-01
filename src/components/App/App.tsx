import React from 'react';
import FilePicker from '../FilePicker/FilePicker';
import styles from './styles.scss';

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <FilePicker />
    </div>
  );
};

export default App;
