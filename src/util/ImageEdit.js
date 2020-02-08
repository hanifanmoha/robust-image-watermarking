import { copy2D } from './ArrayUtil'

function average3(imgSrc) {
  let image = copy2D(imgSrc)
  let N = image.length
  let M = image[0].length
  for (let y = 1; y < N - 1; y++) {
    for (let x = 1; x < M - 1; x++) {
      let sum = 0
      for (let yy = y - 1; yy < y + 2; yy++) {
        for (let xx = x - 1; xx < x + 2; xx++) {
          sum += image[yy][xx]
        }
      }
      image[y][x] = sum / 9
    }
  }
  return image
}

function noise(imgSrc, treshold=0, val=0) {
  let image = copy2D(imgSrc)
  return image.map(row => row.map(cell => {
    return Math.random() < treshold ? val : cell
  }))
}

export {
  average3,
  noise,
}