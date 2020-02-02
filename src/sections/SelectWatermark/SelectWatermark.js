import styles from './SelectWatermark.module.scss'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import P5Wrapper from 'react-p5-wrapper'
import cx from 'classnames'

import Section from '../../components/Section/Section';
import ImageOption from '../../components/ImageOption/ImageOption';
import SubSection from '../../components/SubSection/SubSection';
import SelectImageDescription from '../SelectImage/SelectImageDescription';
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll';

import { getInitialLogos, loadPixelLogos } from './LoadLogos'

const SelectWatermark = ({ className, state, dispatch }) => {
  let title = 'Select Watermark'
  let [logoList, setLogoList] = useState([])

  useEffect(() => {
    let logos = getInitialLogos();
    setLogoList(logos)
    selectLogo(logos[0])
    loadPixelLogos(
      logos,
      (newLogos) => {
        setLogoList(newLogos)
        selectLogo(newLogos[0])
      }
    )
  }, [])

  let selectLogo = (logoData) => {
    dispatch({
      type: 'SET_WATERMARK',
      payload: logoData
    })
  }

  let logoKey = state.watermark ? state.watermark.key : null
  let logoPixels = state.watermark && state.watermark.isPixelLoaded ? state.watermark.pixels : null


  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <SelectImageDescription />
      <SubSection>
        <div className={styles.selectedLogoContainer}>
          <P5Wrapper sketch={loadLogoSketch} img={logoPixels} />
        </div>
        <HorizontalScroll>
          {logoList.map((logoData) => <ImageOption
            className={styles.imageOption}
            key={logoData.key}
            image={logoData.image}
            onSelectImage={() => selectLogo(logoData)}
            isSelected={logoData.key === logoKey}
          />)}
        </HorizontalScroll>
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(SelectWatermark);

const loadLogoSketch = p => {

  const SIZE = 120
  let imgEl

  p.setup = () => {
    p.createCanvas(SIZE, SIZE)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = ({ img }) => {
    if (img) {
      let h = img.length
      let w = img[0].length
      let temp = p.createImage(w, h)
      temp.loadPixels()
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let index = (y * w + x) * 4
          temp.pixels[index] = img[y][x]
          temp.pixels[index + 1] = img[y][x]
          temp.pixels[index + 2] = img[y][x]
          temp.pixels[index + 3] = 255
        }
      }
      temp.updatePixels()
      imgEl = temp
    }
  }

  p.draw = () => {
    if (imgEl) {
      p.image(imgEl, 0, 0, SIZE, SIZE)
    }
  }

}