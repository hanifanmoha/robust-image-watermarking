import styles from './EmbedWatermark.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'
import { connect } from 'react-redux'

import { embed } from '../../util/Fourier';

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';

const EmbedWatermark = ({ className, state, dispatch }) => {
  let title = 'Embed Watermark'

  let [toggle, setToggle] = useState(false)
  let [cover, setCover] = useState(null)
  let [watermark, setWatermark] = useState(null)

  let startEmbed = () => {
    if(state.coverImage && state.coverImage.pixels && state.coverImage.pixels.length > 0) {
      setCover(state.coverImage.pixels)
    }
    if(state.watermark && state.watermark.pixels && state.watermark.pixels.length > 0) {
      setWatermark(state.watermark.pixels)
    }
    setToggle(!toggle)
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='edit-image'>
      <SubSection>
        <button className={styles.embedButton} onClick={startEmbed}>>> EMBED</button>
      </SubSection>
      <SubSection>
          <P5Wrapper sketch={embedSketch} watermark={watermark} cover={cover} toggle={toggle} />
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
  let myToggle = false
  let imgEl
  let embedStatus = ''

  p.setup = () => {
    p.createCanvas(SIZE, SIZE)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = ({ cover, watermark, toggle }) => {
    if (cover && watermark && toggle !== myToggle) {
      console.log('recalculate ...')
      myToggle = toggle
      let img = embed(cover, watermark, updateStatus)
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

  function updateStatus(status) {
    embedStatus = status
    console.log(status)
  }

}