import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

const Logo: FunctionComponent = () => (
  <img src="logo.png" className={styles.image}/>
);

export default Logo;
