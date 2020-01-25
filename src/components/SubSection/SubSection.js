import styles from './SubSection.module.scss'
import React from 'react'
import cx from 'classnames'

const SubSection = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      {children}
    </div>
  );
}

export default SubSection;