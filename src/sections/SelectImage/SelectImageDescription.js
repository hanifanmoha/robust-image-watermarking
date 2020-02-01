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
      <p>In this example, the image is compressed to make the computation easier.</p>
      <br/>
      <p>Let's be kind to our computer!</p>
    </SubSection>
  )
}

export default SelectImageDescription;