import styles from './SelectWatermarkDescription.module.scss'
import React from 'react'
import cx from 'classnames'
import SubSection from '../../components/SubSection/SubSection';

const SelectWatermarkDescription = ({ className }) => {
  return (
    <SubSection className={cx(className, styles.root)}>
      <p>Select a watermark to be embedded to the cover image.</p>
      <br />
      <p>A robust algorithm have to prevent the watermark get tampered as the cover image get edited.</p>
    </SubSection>
  )
}

export default SelectWatermarkDescription;