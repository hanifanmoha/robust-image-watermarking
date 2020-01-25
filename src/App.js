import styles from './App.module.scss'
import React from 'react'
import cx from 'classnames'

const App = ({className}) => {
  return (
    <div className={cx(className, styles.root)}>
      Hello World
    </div>
  );
}

export default App;