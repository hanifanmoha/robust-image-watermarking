import { create2D, cut2D, put2D, map2D, abs2D } from './ArrayUtil'

function c(v) {
  if (v == 0) return 1 / Math.sqrt(2)
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
      if(cb) {
        let percentage = (u * N + v) / ( N * M )
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
  let N = img.length
  let M = img[0].length
  let SIZE = Math.min(N, M)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if(y === SIZE - x - 1) {
        img[y][x] = pixel
      }
    }
  }
  return img
}

function extractPixel(img) {
  let N = img.length
  let M = img[0].length
  let SIZE = Math.min(N, M)
  let sum = 0
  let count = 0
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if(y === SIZE - x - 1) {
        sum+= img[y][x]
        count++
      }
    }
  }
  return (sum / count) < 128 ? 0 : 255
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
      let extractedPixel = extractPixel(img)
      result[yy][xx] = extractedPixel
    }
  }
  return result
}

export { embed, extract }