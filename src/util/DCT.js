import { create2D, cut2D, put2D } from './ArrayUtil'

const START_PAIR_INDEX = 14
const N_PAIR_INDEX = 11

const pairs = getSequences()

function c(v) {
  if (v === 0) return 1 / Math.sqrt(2)
  else return 1
}

function g(x, u, M) {
  return (2 * x + 1) * u * Math.PI / (2 * M)
}

function transform2D(img, cb) {
  let N = img.length
  let M = img[0].length
  let res = create2D(N, M)
  for (let u = 0; u < N; u++) {
    for (let v = 0; v < M; v++) {
      let sum = 0
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          sum += img[y][x] * Math.cos(g(x, v, M)) * Math.cos(g(y, u, N))
        }
      }
      res[u][v] = 2 / Math.sqrt(N * M) * c(u) * c(v) * sum
      if (cb) {
        let percentage = (u * N + v) / (N * M)
        cb(percentage)
      }
    }
  }
  return res
}

function iTransform2D(freqs) {
  let N = freqs.length
  let M = freqs[0].length
  let res = create2D(N, M)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      let sum = 0
      for (let u = 0; u < N; u++) {
        for (let v = 0; v < M; v++) {
          sum += c(u) * c(v) * freqs[u][v] * Math.cos(g(x, v, M)) * Math.cos(g(y, u, N))
        }
      }
      res[y][x] = 2 / Math.sqrt(N * M) * sum
    }
  }
  return res
}

function embedPixel(img, pixel) {
  for (let i = START_PAIR_INDEX; i < START_PAIR_INDEX + N_PAIR_INDEX * 2; i += 2) {
    let x1 = pairs[i][0]
    let y1 = pairs[i][1]
    let x2 = pairs[i + 1][0]
    let y2 = pairs[i + 1][1]
    if (pixel >= 128 && img[x1][y1] > img[x2][y2]) {
      let temp = img[x1][y1]
      img[x1][y1] = img[x2][y2]
      img[x2][y2] = temp
    }
    if (pixel < 128 && img[x1][y1] < img[x2][y2]) {
      let temp = img[x1][y1]
      img[x1][y1] = img[x2][y2]
      img[x2][y2] = temp
    }
  }
  return img
}

function extractPixel(img) {
  let count0 = 0
  let count1 = 0
  for (let i = START_PAIR_INDEX; i < START_PAIR_INDEX + N_PAIR_INDEX * 2; i += 2) {
    let x1 = pairs[i][0]
    let y1 = pairs[i][1]
    let x2 = pairs[i + 1][0]
    let y2 = pairs[i + 1][1]
    if (img[x1][y1] > img[x2][y2]) count0++
    else count1++
  }
  return count0 > count1 ? 0 : 255
}

function embed(cover, watermark) {
  let N = cover.length
  let M = cover[0].length
  let result = create2D(M, N)
  const FRAME_SIZE = 8
  for (let yy = 0; yy < N / FRAME_SIZE; yy++) {
    for (let xx = 0; xx < M / FRAME_SIZE; xx++) {
      let y = yy * FRAME_SIZE
      let x = xx * FRAME_SIZE
      let img = cut2D(cover, x, x + FRAME_SIZE, y, y + FRAME_SIZE)
      let transformedImg = transform2D(img)
      let embeddedImg = embedPixel(transformedImg, watermark[yy][xx])
      let inversedImg = iTransform2D(embeddedImg)
      put2D(result, inversedImg, x, y)
    }
  }
  return result
}

function extract(image) {
  let N = image.length
  let M = image[0].length
  const FRAME_SIZE = 8
  let result = create2D(M / FRAME_SIZE, N / FRAME_SIZE)
  for (let yy = 0; yy < N / FRAME_SIZE; yy++) {
    for (let xx = 0; xx < M / FRAME_SIZE; xx++) {
      let y = yy * FRAME_SIZE
      let x = xx * FRAME_SIZE
      let img = cut2D(image, x, x + FRAME_SIZE, y, y + FRAME_SIZE)
      let transformedImg = transform2D(img)
      let extractedPixel = extractPixel(transformedImg)
      result[yy][xx] = extractedPixel
    }
  }
  return result
}

export { embed, extract }


// Get sequence of 8x8 image zig-zag
function getSequences() {
  let sequences = []
  let x = 0
  let y = 0
  while (x < 8 && y < 8) {
    sequences.push([y, x])
    if ((y === 0 || y === 7) && x % 2 === 0) {
      x += 1
    } else if ((x === 0 || x === 7) && y % 2 === 1) {
      y += 1
    } else if ((x + y) % 2 === 1) {
      y += 1
      x -= 1
    } else if ((x + y) % 2 === 0) {
      y -= 1
      x += 1
    } else {
      console.log('Wrong rule.')
    }
  }
  return sequences
}