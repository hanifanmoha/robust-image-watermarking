import styles from './HorizontalScroll.module.scss'
import React from 'react'
import cx from 'classnames'

const HorizontalScroll = ({
  className,
  children
}) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.scrollable}>
        {children}
      </div>
    </div>
  );
}

export default HorizontalScroll;