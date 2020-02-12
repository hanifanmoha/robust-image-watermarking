import styles from './SelectImageDescription.module.scss'
import React from 'react'
import cx from 'classnames'
import SubSection from '../../components/SubSection/SubSection';

const SelectImageDescription = ({className}) => {
  return (
    <SubSection className={cx(className, styles.root)}>
      <p>Select one image that you want to protect as an example.</p>
      <br/>
      <br/>
      <br/>
      <br/>
      <p>In this example, we use image with size 256x256 pixels to make the computation easier.</p>
    </SubSection>
  )
}

export default SelectImageDescription;