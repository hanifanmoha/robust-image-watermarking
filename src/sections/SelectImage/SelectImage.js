import styles from './SelectImage.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'
import Section from '../../components/Section/Section'
import ImageOption from '../../components/ImageOption/ImageOption'
import Image from './image.png'
import SubSection from '../../components/SubSection/SubSection';

const SubSection1 = () => {
  return (
    <SubSection>
      <p>Select one image that you want to protect as an example.</p>
      <br/>
      <br/>
      <br/>
      <br/>
      <p>In this example, the image is compressed to make the computation easier.</p>
      <br/>
      <p>Let's be kind to our computer!</p>
    </SubSection>
  )
}

const SelectImage = ({ className }) => {
  let title = 'Select Cover Image'
  let [selectedImageKey, setSelectedImageKey] = useState(0)
  let [selectedImage, setSelectedImage] = useState()

  let selectImage = ({ key, image }) => {
    setSelectedImageKey(key)
    setSelectedImage(image)
  }

  return (
    <Section title={title} className={cx(className, styles.root)} id='select-image'>
      <SubSection1 />
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

export default SelectImage;

const imageList = [
  { key: 1, image: Image },
  { key: 2, image: Image },
  { key: 3, image: Image },
  { key: 4, image: Image },
]