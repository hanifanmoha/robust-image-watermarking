import styles from './App.module.scss'
import React from 'react'
import cx from 'classnames'
import SelectImage from './sections/SelectImage/SelectImage';

const App = ({className}) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={cx(styles.container)}>
        <SelectImage />
      </div>
    </div>
  );
}

export default App;