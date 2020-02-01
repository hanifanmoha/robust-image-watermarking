import styles from './SelectWatermark.module.scss'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Section from '../../components/Section/Section';
import ImageOption from '../../components/ImageOption/ImageOption';
import SubSection from '../../components/SubSection/SubSection';
import Logo from './logo.png'
import SelectImageDescription from '../SelectImage/SelectImageDescription';

const SelectWatermark = ({ className, state, dispatch }) => {
  let title = 'Select Watermark'
  let [selectedLogoKey, setSelectedLogoKey] = useState(0)

  let selectLogo = ({ key, logo }) => {
    setSelectedLogoKey(key)
    dispatch({
      type: 'SET_WATERMARK',
      payload: logo
    })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <SelectImageDescription />
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

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(SelectWatermark);

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