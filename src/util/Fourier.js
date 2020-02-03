import { create2D, cut2D, put2D, map2D, abs2D } from './ArrayUtil'

function transform2D(img) {
  let N = img.length
  let M = img[0].length
  let res = create2D(N, M)
  for (let u = 0; u < N; u++) {
    for (let v = 0; v < M; v++) {
      let re = 0
      let im = 0
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          let pw = 2 * Math.PI * ((y * u / N) + (x * v / M))
          re += img[y][x] * Math.cos(pw)
          im -= img[y][x] * Math.sin(pw)
        }
      }
      res[u][v] = { re, im }
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
      let re = 0
      let im = 0
      for (let u = 0; u < N; u++) {
        for (let v = 0; v < M; v++) {
          let pw = 2 * Math.PI * ((y * u / N) + (x * v / M))
          re += freqs[u][v].re * Math.cos(pw) - freqs[u][v].im * Math.sin(pw)
          im += freqs[u][v].re * Math.sin(pw) + freqs[u][v].im * Math.cos(pw)
        }
      }
      res[y][x] = {
        re: re / (M * N),
        im: im / (M * N),
      }
    }
  }
  return res
}

function embed(cover, watermark, statusCallback) {
  let N = cover.length
  let M = cover[0].length
  let result = create2D(M, N)
  for (let y = 0; y < N; y += 8) {
    for (let x = 0; x < M; x += 8) {
      let img = cut2D(cover, x, x + 8, y, y + 8)
      let transformedImg = transform2D(img)
      console.log(transformedImg)
      let inversedImg = iTransform2D(transformedImg)
      console.log(transformedImg)
      put2D(result, abs2D(inversedImg), x, y)
    }
  }
  return result
}

function extract() {

}

export { embed }