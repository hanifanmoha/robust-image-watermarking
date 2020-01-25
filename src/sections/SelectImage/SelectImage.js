import styles from './SelectImage.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section'
import ImageOption from '../../components/ImageOption/ImageOption'

import Image1 from './image.png'
import Image2 from './image.png'
import Image3 from './image.png'
import Image4 from './image.png'
import Image5 from './image.png'

const SelectImage = ({ className }) => {
  let title = 'Select Image'
  let [selectedImageKey, setSelectedImageKey] = useState(0)
  let [selectedImage, setSelectedImage] = useState()

  let selectImage = ({ key, image }) => {
    setSelectedImageKey(key)
    setSelectedImage(image)
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <div className={styles.images}>
        {imageList.map(({ image, key }) => <ImageOption
          key={key}
          image={image}
          onSelectImage={() => selectImage({image, key})}
          isSelected={key === selectedImageKey}
        />)}
      </div>
    </Section>
  );
}

export default SelectImage;



const imageList = [
  { key: 1, image: Image1 },
  { key: 2, image: Image2 },
  { key: 3, image: Image3 },
  { key: 4, image: Image4 },
  { key: 5, image: Image5 },
]