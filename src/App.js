import styles from './App.module.scss'
import React from 'react'
import cx from 'classnames'
import SelectImage from './sections/SelectImage/SelectImage';
import SelectWatermark from './sections/SelectWatermark/SelectWatermark';
import EditImage from './sections/EditImage/EditImage';
import Footer from './sections/Footer/Footer';
import ExtractWatermark from './sections/ExtractWatermark/ExtractWatermark';

const App = ({className}) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={cx(styles.container)}>
        <SelectImage />
        <SelectWatermark />
        <EditImage />
        <ExtractWatermark />
        <Footer />
      </div>
    </div>
  );
}

export default App;