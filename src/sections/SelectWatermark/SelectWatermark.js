import styles from './SelectWatermark.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section';
import ImageOption from '../../components/ImageOption/ImageOption';

import Logo from './logo.png'

const SelectWatermark = ({ className }) => {
  let title = 'Select Watermark'
  let [selectedLogoKey, setSelectedLogoKey] = useState(0)
  let [selectedLogo, setSelectedLogo] = useState()

  let selectLogo = ({ key, logo }) => {
    setSelectedLogoKey(key)
    setSelectedLogo(logo)
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <div className={styles.images}>
        {logoList.map(({ logo, key }) => <ImageOption
          key={key}
          image={logo}
          onSelectImage={() => selectLogo({ logo, key })}
          isSelected={key === selectedLogoKey}
        />)}
      </div>
    </Section>
  );
}

export default SelectWatermark;

const logoList = [
  { key: 1, logo: Logo },
  { key: 2, logo: Logo },
  { key: 3, logo: Logo },
  { key: 4, logo: Logo },
  { key: 5, logo: Logo },
  { key: 6, logo: Logo },
  { key: 7, logo: Logo },
]