import styles from './SelectImage.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Section from '../../components/Section/Section'
import ImageOption from '../../components/ImageOption/ImageOption'
import Image from './image.png'
import SubSection from '../../components/SubSection/SubSection';
import SelectImageDescription from './SelectImageDescription';

const SelectImage = ({ className, state, dispatch }) => {
  let title = 'Select Cover Image'
  let [selectedImageKey, setSelectedImageKey] = useState(0)

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
        <div className={styles.images}>
          {imageList.map(({ image, key }) => <ImageOption
            className={styles.imageOption}
            key={key}
            image={image}
            onSelectImage={() => selectImage({ image, key })}
            isSelected={key === selectedImageKey}
          />)}
        </div>
      </SubSection>
    </Section>
  );
}

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(SelectImage);

const imageList = [
  { key: 1, image: Image },
  { key: 2, image: Image },
  { key: 3, image: Image },
  { key: 4, image: Image },
]