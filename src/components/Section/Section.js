import styles from './Section.module.scss'
import React from 'react'
import cx from 'classnames'

const Section = ({ className, children, title, id }) => {
  return (
    <div id={id} className={cx(className, styles.root)}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.underline} />
      <div className={styles.subsections}>
        {children}
      </div>
    </div>
  );
}

export default Section;