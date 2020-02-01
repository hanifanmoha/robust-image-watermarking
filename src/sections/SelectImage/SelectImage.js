import styles from './SelectImage.module.scss'
import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Section from '../../components/Section/Section'
import ImageOption from '../../components/ImageOption/ImageOption'
import { ImageList } from './LoadImages'
import SubSection from '../../components/SubSection/SubSection';
import SelectImageDescription from './SelectImageDescription';
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll';

const SelectImage = ({ className, state, dispatch }) => {
  let title = 'Select Cover Image'
  let [selectedImageKey, setSelectedImageKey] = useState(0)

  useEffect(() => {
    selectImage(ImageList[0])
  }, [])

  let selectImage = ({ key, image }) => {
    setSelectedImageKey(key)
    dispatch({
      type: 'SET_COVER_IMAGE',
      payload: image
    })
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <SelectImageDescription />
      <SubSection>
        <div className={styles.selectedImageContainer}>
          <img src={state.coverImage} className={styles.selectedImage} />
        </div>
        <HorizontalScroll>
          {ImageList.map(({ image, key }) => <ImageOption
            className={styles.imageOption}
            key={key}
            image={image}
            onSelectImage={() => selectImage({ image, key })}
            isSelected={key === selectedImageKey}
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