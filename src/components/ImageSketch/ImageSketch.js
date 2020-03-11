// import styles from './ImageSketch.module.scss'
import React from 'react'
// import cx from 'classnames'
import P5Wrapper from 'react-p5-wrapper'

const ImageSketch = ({ imagePixels }) => {
  return (
      <P5Wrapper sketch={loadImageSketch} img={imagePixels} />
  );
}

export default ImageSketch;

const loadImageSketch = p => {

  const SIZE = 256
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
          temp.pixels[index] = img[y][x][0]
          temp.pixels[index + 1] = img[y][x][1]
          temp.pixels[index + 2] = img[y][x][2]
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