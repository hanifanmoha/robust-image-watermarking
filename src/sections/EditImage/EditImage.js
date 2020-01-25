import styles from './EditImage.module.scss'
import React from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section';
import Image from './image.png'

const EditImage = ({className}) => {
  let title = 'Edit Image'
  return (
    <Section title={title} className={cx(className, styles.root)} id='edit-image'>
      <img src={Image} alt='Watermarked Image' className={styles.watermarkedImage} />
    </Section>
  );
}

export default EditImage;