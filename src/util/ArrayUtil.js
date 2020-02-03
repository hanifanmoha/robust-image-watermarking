function create1D(length) {
  return [...Array(length)].map(() => 0)
}

function create2D(width, height) {
  return [...Array(height)].map(() => create1D(width))
}

function cut2D(array, xstart, xend, ystart, yend) {
  return array.slice(ystart, yend).map(row => row.slice(xstart, xend))
}

function put2D(array, block, xstart, ystart) {
  let N = array.length
  let M = array[0].length
  let A = block.length
  let B = block[0].length
  for (let y = 0; (y < A) && (y + ystart < N); y++) {
    for (let x = 0; (x < B) && (x + xstart < M); x++) {
      array[y + ystart][x + xstart] = block[y][x]
    }
  }
}

function abs2D(array) {
  return array.map(row => {
    return row.map(cell => {
      return Math.sqrt(cell.re * cell.re + cell.im + cell.im)
    })
  })
}

function map2D(array, mapper) {
  return array.map(row => {
    return row.map(cell => {
      if(mapper) {
        return mapper(cell)
      } else {
        return cell
      }
    })
  })
}

export {
  create2D,
  cut2D,
  put2D,
  abs2D,
  map2D,
}