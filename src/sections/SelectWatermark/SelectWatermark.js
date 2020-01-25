import styles from './SelectWatermark.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section';
import ImageOption from '../../components/ImageOption/ImageOption';
import SubSection from '../../components/SubSection/SubSection';
import Logo from './logo.png'

const SubSection1 = () => {
  return (
    <SubSection>
      <p>Select a watermark to be embedded to the cover image.</p>
      <br/>
      <p>A robust algorithm have to prevent the watermark get tampered as the cover image get edited.</p>
    </SubSection>
  )
}

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
      <SubSection1 />
      <SubSection>
        <div className={styles.images}>
          {logoList.map(({ logo, key }) => <ImageOption
            className={styles.imageOption}
            key={key}
            image={logo}
            onSelectImage={() => selectLogo({ logo, key })}
            isSelected={key === selectedLogoKey}
          />)}
        </div>
      </SubSection>
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
  { key: 8, logo: Logo },
]