import styles from './ImageOption.module.scss'
import React from 'react'
import cx from 'classnames'

const ImageOption = ({
  className,
  image,
  onSelectImage,
  isSelected,
}) => {
  return (
    <div className={cx({
      [className]: true,
      [styles.root]: true,
      [styles.selected]: isSelected
    })} onClick={onSelectImage}>
      <div className={styles.overlay}></div>
      <div style={{ backgroundImage: `url(${image})` }} className={styles.image} />
    </div>
  );
}

export default ImageOption;