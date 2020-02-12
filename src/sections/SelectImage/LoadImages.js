import { loadPixel } from '../../util/LoadPixel'

import Airplane from '../../images/cover/airplane.png'
import Baboon from '../../images/cover/baboon.png'
import Barbara from '../../images/cover/barbara.png'
import Boat from '../../images/cover/boat.png'
import Fruits from '../../images/cover/fruits.png'
import Goldhill from '../../images/cover/goldhill.png'
import Lena from '../../images/cover/lena.png'
import Peppers from '../../images/cover/peppers.png'
import Zelda from '../../images/cover/zelda.png'

const getInitialImages = () => [
  { key: 'peppers', image: Peppers, pixels: [], isPixelLoaded: false },
  { key: 'baboon', image: Baboon, pixels: [], isPixelLoaded: false },
  { key: 'barbara', image: Barbara, pixels: [], isPixelLoaded: false },
  { key: 'zelda', image: Zelda, pixels: [], isPixelLoaded: false },
  { key: 'goldhill', image: Goldhill, pixels: [], isPixelLoaded: false },
  { key: 'boat', image: Boat, pixels: [], isPixelLoaded: false },
  { key: 'lena', image: Lena, pixels: [], isPixelLoaded: false },
  { key: 'airplane', image: Airplane, pixels: [], isPixelLoaded: false },
  { key: 'fruits', image: Fruits, pixels: [], isPixelLoaded: false },
]

const loadPixelImages = async (images, onFinish, onError) => {
  try {
    let loadImagePromises = images.map(async ({ key, image, pixels, isPixelLoaded }) => {
      let newPixels = await loadPixel(
        image,
        px => Math.floor((px[0] + px[1] + px[2]) / 3)
      )
      return { key, image, pixels: newPixels, isPixelLoaded: true }
    })
    let loaded = await Promise.all(loadImagePromises)
    onFinish(loaded)
  } catch (err) {
    console.error(err)
  }
}

export {
  getInitialImages,
  loadPixelImages
}