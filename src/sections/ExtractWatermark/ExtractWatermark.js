import styles from './ExtractWatermark.module.scss'
import React from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section';
import Logo from './logo.png'
import SubSection from '../../components/SubSection/SubSection';

const ExtractWatermark = ({ className }) => {
  let title = 'Extract Watermark'
  return (
    <Section title={title} className={cx(className, styles.root)} id='extract-watermark'>
      <SubSection />
      <SubSection>
        <img src={Logo} alt='Extracted Watermark' className={styles.watermark} />
      </SubSection>
    </Section>
  );
}

export default ExtractWatermark;