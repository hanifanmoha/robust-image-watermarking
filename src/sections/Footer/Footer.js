import styles from './Footer.module.scss'
import React from 'react'
import cx from 'classnames'

const Footer = ({className}) => {
  return (
    <div className={cx(className, styles.root)}>
      &copy; 2020 Allah SWT
    </div>
  );
}

export default Footer;