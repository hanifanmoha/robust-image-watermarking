import { loadPixel } from '../../util/LoadPixel'

import Agito from '../../images/watermark/agito.png'
import ECorp from '../../images/watermark/ecorp.png'
import Kiva from '../../images/watermark/kiva.png'
import Node from '../../images/watermark/node.png'
import Ouroboros from '../../images/watermark/ouroboros.png'
import Ryuki from '../../images/watermark/ryuki.png'
import Seal from '../../images/watermark/seal.png'
import Ubuntu from '../../images/watermark/ubuntu.png'

const getInitialLogos = () => [
  { key: 'ubuntu', image: Ubuntu, pixels: [], isPixelLoaded: false },
  { key: 'ecorp', image: ECorp, pixels: [], isPixelLoaded: false },
  { key: 'kiva', image: Kiva, pixels: [], isPixelLoaded: false },
  { key: 'seal', image: Seal, pixels: [], isPixelLoaded: false },
  { key: 'node', image: Node, pixels: [], isPixelLoaded: false },
  { key: 'agito', image: Agito, pixels: [], isPixelLoaded: false },
  { key: 'ouroboros', image: Ouroboros, pixels: [], isPixelLoaded: false },
  { key: 'ryuki', image: Ryuki, pixels: [], isPixelLoaded: false },
]

const loadPixelLogos = async (images, onFinish, onError) => {
  try {
    let loadImagePromises = images.map(async ({ key, image }) => {
      let newPixels = await loadPixel(
        image,
        px => Math.floor((px[0] + px[1] + px[2]) / 3) > 127 ? 255 : 0
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
  getInitialLogos,
  loadPixelLogos
}