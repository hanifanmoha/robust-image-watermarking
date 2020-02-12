import styles from './App.module.scss'
import React, { useEffect } from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import store from './reducers/RootReducer'

import SelectImage from './sections/SelectImage/SelectImage';
import SelectWatermark from './sections/SelectWatermark/SelectWatermark';
import EditImage from './sections/EditImage/EditImage';
import Footer from './sections/Footer/Footer';
import ExtractWatermark from './sections/ExtractWatermark/ExtractWatermark';
import EmbedWatermark from './sections/EmbedWatermark/EmbedWatermark';

const App = ({ className }) => {

  useEffect(() => {
  //   let element = document.getElementById('embed-watermark');
  //   if(element) {
  //     element.scrollIntoView();
  //   }
  }, [])

  return (
    <Provider store={store}>
      <div className={cx(className, styles.root)}>
        <div className={cx(styles.container)}>
          <SelectImage />
          <SelectWatermark />
          <EmbedWatermark />
          <EditImage />
          <ExtractWatermark />
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;