import styles from './EmbedWatermark.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'
import { connect } from 'react-redux'

import * as dct from '../../util/DCT'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';

const EmbedWatermark = ({ className, state, dispatch }) => {
  let title = 'Embed Watermark'

  let startEmbed = () => {
    let watermarked = dct.embed(state.coverImagePixel, state.watermarkPixel)
    dispatch({
      type: 'SET_WATERMARKED_IMAGE_PIXEL',
      payload: watermarked
    })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='edit-image'>
      <SubSection>
        <button className={styles.embedButton} onClick={startEmbed}>>> EMBED</button>
      </SubSection>
      <SubSection>
          <P5Wrapper sketch={embedSketch} img={state.watermarkedImagePixel} />
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(EmbedWatermark);

const embedSketch = p => {

  const SIZE = 200
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