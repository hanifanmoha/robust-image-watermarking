import getPixels from 'get-pixels'

const loadPixel = (image, mapper) => new Promise((resolve, reject) => {
  getPixels(image, function (err, img) {
    if (err) {
      reject(err)
      return
    } else {
      let [w, h, c] = img.shape
      let newPixels = []
      for (let y = 0; y < h; y++) {
        let row = []
        for (let x = 0; x < w; x++) {
          let px = []
          let index = (y * w + x) * c
          for (let k = 0; k < c; k++) {
            px.push(img.data[index + k])
          }
          row.push(px)
        }
        newPixels.push(row)
      }
      newPixels = newPixels.map(row => row.map(col => {
        if(mapper) {
          return mapper(col)
        } else {
          return col
        }
      }))
      resolve(newPixels)
    }
  })
})

export { loadPixel }