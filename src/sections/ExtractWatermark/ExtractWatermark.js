import styles from './ExtractWatermark.module.scss'
import React from 'react'
import cx from 'classnames'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';

const ExtractWatermark = ({ className }) => {
  let title = 'Extract Watermark'

  let startExtract = () => {
    alert("Be careful!")
    // let extracted = dct.embed(state.coverImagePixel, state.watermarkPixel)
    // dispatch({
    //   type: 'SET_WATERMARKED_IMAGE_PIXEL',
    //   payload: watermarked
    // })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='extract-watermark'>
      <SubSection>
        <button className={styles.extractButton} onClick={startExtract}>>> Extract</button>
      </SubSection>
      <SubSection>
        {/* <img src={Logo} alt='Extracted Watermark' className={styles.watermark} /> */}
      </SubSection>
    </Section>
  );
}

export default ExtractWatermark;