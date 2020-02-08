import styles from './SelectImage.module.scss'
import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'
import { connect } from 'react-redux'

import Section from '../../components/Section/Section'
import ImageOption from '../../components/ImageOption/ImageOption'
import SubSection from '../../components/SubSection/SubSection'
import SelectImageDescription from './SelectImageDescription'
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'

import { getInitialImages, loadPixelImages } from './LoadImages'

const SelectImage = ({ className, state, dispatch }) => {
  let title = 'Select Cover Image'
  let [imageList, setImageList] = useState([])

  useEffect(() => {
    let images = getInitialImages();
    setImageList(images)
    loadPixelImages(
      images,
      (newImages) => {
        setImageList(newImages)
        selectImage(newImages[0])
      }
    )
  }, [])

  let selectImage = (imageData) => {
    dispatch({
      type: 'SET_COVER_IMAGE',
      payload: imageData
    })
  }

  let imgKey = state.coverImage ? state.coverImage.key : null

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <SelectImageDescription />
      <SubSection>
        <div className={styles.selectedImageContainer}>
          <P5Wrapper sketch={loadImageSketch} img={state.coverImagePixel} />
        </div>
        <HorizontalScroll>
          {imageList.map((imageData) => <ImageOption
            className={styles.imageOption}
            key={imageData.key}
            image={imageData.image}
            onSelectImage={() => selectImage(imageData)}
            isSelected={imageData.key === imgKey}
          />)}
        </HorizontalScroll>
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(SelectImage);

const loadImageSketch = p => {

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
