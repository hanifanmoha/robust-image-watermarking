import styles from './EditImage.module.scss'
import React from 'react'
import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'
import { connect } from 'react-redux'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';
import * as Editor from '../../util/ImageEdit'
import * as C from '../../util/Const'

const EditImage = ({ className, state, dispatch }) => {
  let title = 'Edit Image'

  let average3 = () => {
    let edited = Editor.average3(state.editedWatermarkedImagePixel)
    dispatch({
      type: C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL,
      payload: edited
    })
  }

  let noise = () => {
    let edited = Editor.noise(state.editedWatermarkedImagePixel, 0.05)
    dispatch({
      type: C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL,
      payload: edited
    })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='edit-image'>
      <SubSection>
        <button className={styles.actionButton} onClick={average3}>>> AVERAGING[3x3]</button>
        <button className={styles.actionButton} onClick={noise}>>> NOISE 5%</button>
      </SubSection>
      <SubSection>
        <P5Wrapper sketch={sketch} img={state.editedWatermarkedImagePixel} />
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({state}),
  dispatch => ({dispatch})
)(EditImage);

const sketch = p => {

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