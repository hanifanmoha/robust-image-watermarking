import styles from './Section.module.scss'
import React from 'react'
import cx from 'classnames'

const Section = ({className, children, title, id}) => {
  return (
    <div id={id} className={cx(className, styles.root)}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
}

export default Section;