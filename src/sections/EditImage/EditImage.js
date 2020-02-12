import styles from './EditImage.module.scss'
import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'
import { connect } from 'react-redux'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';
import * as Editor from '../../util/ImageEdit'
import * as C from '../../util/Const'

const EditImage = ({ className, state, dispatch }) => {
  let title = 'Edit Image'

  let [average3Active, setAverage3Active] = useState(true)
  let [noiseActive, setNoiseActive] = useState(true)

  useEffect(() => {
    activateEditButton()
  }, [state.watermarkedImagePixel])

  let activateEditButton = () => {
    setAverage3Active(true)
    setNoiseActive(true)
  }

  let reset = () => {
    dispatch({
      type: C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL,
      payload: state.watermarkedImagePixel
    })
    activateEditButton()
  }

  let average3 = () => {
    if(!average3Active) return
    let edited = Editor.average3(state.editedWatermarkedImagePixel)
    dispatch({
      type: C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL,
      payload: edited
    })
    setAverage3Active()
  }

  let noise = () => {
    if(!noiseActive) return
    let edited = Editor.noise(state.editedWatermarkedImagePixel, 0.01)
    dispatch({
      type: C.ACTION_SET_EDITED_WATERMARKED_IMAGE_PIXEL,
      payload: edited
    })
    setNoiseActive()
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='edit-image'>
      <SubSection>
        <button className={cx({
          [styles.actionButton]: true,
          [styles.actionButtonRed]: true
        })} onClick={reset}>{'RESET <<'}</button>
        <button className={cx({
          [styles.actionButton]: true,
          [styles.actionButtonInactive]: !average3Active
        })} onClick={average3}>>> AVERAGING[3x3]</button>
        <button className={cx({
          [styles.actionButton]: true,
          [styles.actionButtonInactive]: !noiseActive
        })} onClick={noise}>>> NOISE 1%</button>
      </SubSection>
      <SubSection>
        <P5Wrapper sketch={sketch} img={state.editedWatermarkedImagePixel} />
      </SubSection>
    </Section >
  );
}

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
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