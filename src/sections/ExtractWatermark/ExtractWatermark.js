import styles from './ExtractWatermark.module.scss'
import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import P5Wrapper from 'react-p5-wrapper'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';
import * as dct from '../../util/DCT'
import * as C from '../../util/Const'

const ExtractWatermark = ({ className, state, dispatch }) => {
  let title = 'Extract Watermark'

  let startExtract = () => {
    let extracted = dct.extract(state.watermarkedImagePixel)
    dispatch({
      type: C.ACTION_SET_EXTRACTED_WATERMARK,
      payload: extracted
    })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='extract-watermark'>
      <SubSection>
        <button className={styles.extractButton} onClick={startExtract}>>> EXTRACT</button>
      </SubSection>
      <SubSection>
        <P5Wrapper sketch={sketch} img={state.extractedWatermarkPixel} />
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({state}),
  dispatch => ({dispatch})
)(ExtractWatermark)

const sketch = p => {

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